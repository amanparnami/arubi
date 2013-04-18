using System.Windows;
using System.Windows.Data;
using Microsoft.Kinect;
using Microsoft.Kinect.Toolkit;
using Microsoft.Samples.Kinect.WpfViewers;
using System.Diagnostics;
using System.ComponentModel;
using System;
using System.Net;
using System.Text;
using System.IO;
using Fizbin.Kinect.Gestures;
using Microsoft.Speech.Recognition;
using System.Collections.Generic;
using Microsoft.Speech.AudioFormat;
using System.Threading;
using System.Net.Sockets;

namespace KinectModule
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window, INotifyPropertyChanged
    {

        public String ipAddress;
        private readonly KinectSensorChooser sensorChooser = new KinectSensorChooser();
        private SpeechRecognitionEngine speechEngine;
        private Skeleton[] skeletons = new Skeleton[0];
        private System.IO.Ports.SerialPort serialPort1;
        // skeleton gesture recognizer
        private GestureController gestureController;

        private List<System.Windows.Documents.Span> recognitionSpans;
        //int skCount = 0;
        public MainWindow()
        {
            ipAddress = LocalIPAddress();
            Console.WriteLine("IP Address: " + ipAddress);
            
            DataContext = this;

            InitializeComponent();

            // initialize the Kinect sensor manager
            KinectSensorManager = new KinectSensorManager();
            KinectSensorManager.KinectSensorChanged += this.KinectSensorChanged;

            // locate an available sensor
            sensorChooser.Start();

            // bind chooser's sensor value to the local sensor manager
            var kinectSensorBinding = new Binding("Kinect") { Source = this.sensorChooser };
            BindingOperations.SetBinding(this.KinectSensorManager, KinectSensorManager.KinectSensorProperty, kinectSensorBinding);
            //serialPort1 = new System.IO.Ports.SerialPort("COM6");
            //serialPort1.BaudRate = 9600;

            HttpUpdateIp(ipAddress);
        }

        public string LocalIPAddress()
        {
            IPHostEntry host;
            string localIP = "";
            host = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in host.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    localIP = ip.ToString();
                }
            }
            return localIP;
        }

        #region Kinect Discovery & Setup

        private void KinectSensorChanged(object sender, KinectSensorManagerEventArgs<KinectSensor> args)
        {
            if (null != args.OldValue)
                UninitializeKinectServices(args.OldValue);

            if (null != args.NewValue)
                InitializeKinectServices(KinectSensorManager, args.NewValue);
        }

        /// <summary>
        /// Kinect enabled apps should customize which Kinect services it initializes here.
        /// </summary>
        /// <param name="kinectSensorManager"></param>
        /// <param name="sensor"></param>
        private void InitializeKinectServices(KinectSensorManager kinectSensorManager, KinectSensor sensor)
        {
            // Application should enable all streams first.

            // configure the color stream
            kinectSensorManager.ColorFormat = ColorImageFormat.RgbResolution640x480Fps30;
            kinectSensorManager.ColorStreamEnabled = true;

            // configure the depth stream
            kinectSensorManager.DepthStreamEnabled = true;

            kinectSensorManager.TransformSmoothParameters =
                new TransformSmoothParameters
                {
                    Smoothing = 0.5f,
                    Correction = 0.5f,
                    Prediction = 0.5f,
                    JitterRadius = 0.05f,
                    MaxDeviationRadius = 0.04f
                };

            // configure the skeleton stream
            sensor.SkeletonFrameReady += OnSkeletonFrameReady;
            kinectSensorManager.SkeletonStreamEnabled = true;

            // initialize the gesture recognizer
            gestureController = new GestureController();
            gestureController.GestureRecognized += OnGestureRecognized;

            kinectSensorManager.KinectSensorEnabled = true;

            RecognizerInfo ri = GetKinectRecognizer();

            if (null != ri)
            {
                // recognitionSpans = new List<Span> { forwardSpan, backSpan, rightSpan, leftSpan };

                this.speechEngine = new SpeechRecognitionEngine(ri.Id);

                var directions = new Choices();
                //directions.Add(new SemanticResultValue("forward", "FORWARD"));
                //directions.Add(new SemanticResultValue("forwards", "FORWARD"));
                //directions.Add(new SemanticResultValue("straight", "FORWARD"));
                //directions.Add(new SemanticResultValue("backward", "BACKWARD"));
                //directions.Add(new SemanticResultValue("backwards", "BACKWARD"));
                //directions.Add(new SemanticResultValue("back", "BACKWARD"));
                //directions.Add(new SemanticResultValue("turn left", "LEFT"));
                //directions.Add(new SemanticResultValue("turn right", "RIGHT"));
                directions.Add(new SemanticResultValue("lights on", "LIGHTS_ON"));
                directions.Add(new SemanticResultValue("lights off", "LIGHTS_OFF"));
                directions.Add(new SemanticResultValue("screen up", "SCREEN_UP"));
                directions.Add(new SemanticResultValue("screen down", "SCREEN_DOWN"));
                directions.Add(new SemanticResultValue("projector on", "PROJECTOR_ON"));
                directions.Add(new SemanticResultValue("projector off", "PROJECTOR_OFF"));

                var gb = new GrammarBuilder { Culture = ri.Culture };
                gb.Append(directions);

                var g = new Grammar(gb);

                // Create a grammar from grammar definition XML file.
                //using (var memoryStream = new MemoryStream(Encoding.ASCII.GetBytes(Properties.Resources.SpeechGrammar)))
                //{
                //    var g = new Grammar(memoryStream);
                //    speechEngine.LoadGrammar(g);
                //}

                speechEngine.LoadGrammar(g);
                speechEngine.SpeechRecognized += SpeechRecognized;
                speechEngine.SpeechRecognitionRejected += SpeechRejected;

                speechEngine.SetInputToAudioStream(sensor.AudioSource.Start(), new SpeechAudioFormatInfo(EncodingFormat.Pcm, 16000, 16, 1, 32000, 2, null));
                speechEngine.RecognizeAsync(RecognizeMode.Multiple);
            }
            else
            {
                //this.statusBarText.Text = Properties.Resources.NoSpeechRecognizer;
            }
            if (!kinectSensorManager.KinectSensorAppConflict)
            {
                // addition configuration, as needed
            }
        }

        /// <summary>
        /// Kinect enabled apps should uninitialize all Kinect services that were initialized in InitializeKinectServices() here.
        /// </summary>
        /// <param name="sensor"></param>
        private void UninitializeKinectServices(KinectSensor sensor)
        {
            if (null != sensor)
            {
                sensor.AudioSource.Stop();

                sensor.Stop();
                sensor = null;
            }

            if (null != this.speechEngine)
            {
                this.speechEngine.SpeechRecognized -= SpeechRecognized;
                this.speechEngine.SpeechRecognitionRejected -= SpeechRejected;
                this.speechEngine.RecognizeAsyncStop();
            }
        }


        private static RecognizerInfo GetKinectRecognizer()
        {
            foreach (RecognizerInfo recognizer in SpeechRecognitionEngine.InstalledRecognizers())
            {
                string value;
                recognizer.AdditionalInfo.TryGetValue("Kinect", out value);
                if ("True".Equals(value, StringComparison.OrdinalIgnoreCase) && "en-US".Equals(recognizer.Culture.Name, StringComparison.OrdinalIgnoreCase))
                {
                    return recognizer;
                }
            }

            return null;
        }

        private void ClearRecognitionHighlights()
        {
            
        }

        /// <summary>
        /// Handler for recognized speech events.
        /// </summary>
        /// <param name="sender">object sending the event.</param>
        /// <param name="e">event arguments.</param>
        private void SpeechRecognized(object sender, SpeechRecognizedEventArgs e)
        {
            // Speech utterance confidence below which we treat speech as if it hadn't been heard
            const double ConfidenceThreshold = 0.3;

            ClearRecognitionHighlights();

            if (e.Result.Confidence >= ConfidenceThreshold)
            {
                switch (e.Result.Semantics.Value.ToString())
                {
                    case "LIGHTS_ON":
                        Gesture = "Lights On";
                        HttpGet("speech", "lights_on");
                        break;

                    case "LIGHTS_OFF":
                        Gesture = "Lights Off";
                        HttpGet("speech", "lights_off");
                        break;

                    case "SCREEN_UP":
                        Gesture = "Screen Up";
                        HttpGet("speech", "screen_up");
                        break;

                    case "SCREEN_DOWN":
                        Gesture = "Screen Down";
                        HttpGet("speech", "screen_down");
                        break;

                    case "PROJECTOR_ON":
                        Gesture = "Projector On";
                        HttpGet("speech", "projector_turn_on");
                        break;

                    case "PROJECTOR_OFF":
                        Gesture = "Projector Off";
                        HttpGet("speech", "projector_turn_off");
                        break;
                }
                //Debug.WriteLine(e.Result.Semantics.Value.ToString());
            }
        }

        /// <summary>
        /// Handler for rejected speech events.
        /// </summary>
        /// <param name="sender">object sending the event.</param>
        /// <param name="e">event arguments.</param>
        private void SpeechRejected(object sender, SpeechRecognitionRejectedEventArgs e)
        {
            ClearRecognitionHighlights();
        }

        #endregion Kinect Discovery & Setup

        #region Properties

        public static readonly DependencyProperty KinectSensorManagerProperty =
            DependencyProperty.Register(
                "KinectSensorManager",
                typeof(KinectSensorManager),
                typeof(MainWindow),
                new PropertyMetadata(null));

        public KinectSensorManager KinectSensorManager
        {
            get { return (KinectSensorManager)GetValue(KinectSensorManagerProperty); }
            set { SetValue(KinectSensorManagerProperty, value); }
        }

        /// <summary>
        /// Gets or sets the last recognized gesture.
        /// </summary>
        private string _gesture;
        public String Gesture
        {
            get { return _gesture; }

            private set
            {
                if (_gesture == value)
                    return;

                _gesture = value;

                Debug.WriteLine("Gesture = " + _gesture);

                if (this.PropertyChanged != null)
                    PropertyChanged(this, new PropertyChangedEventArgs("Gesture"));
            }
        }

        #endregion Properties

        #region Events

        /// <summary>
        /// Event implementing INotifyPropertyChanged interface.
        /// </summary>
        public event PropertyChangedEventHandler PropertyChanged;

        #endregion Events

        #region Event Handlers

        /// <summary>
        ///
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e">Gesture event arguments.</param>
        private void OnGestureRecognized(object sender, GestureEventArgs e)
        {
            String gestureName = "";

            //Debug.WriteLine(e.GestureType);

            switch (e.GestureType)
            {                
                case GestureType.WaveRight:
                    Gesture = "Wave Right";
                    gestureName = "wave_right";
                    break;
                case GestureType.WaveLeft:
                    Gesture = "Wave Left";
                    gestureName = "wave_left";
                    break;
                case GestureType.SwipeLeft:
                    Gesture = "Swipe Left";
                    gestureName = "swipe_left";
                    break;
                case GestureType.SwipeRight:
                    Gesture = "Swipe Right";
                    gestureName = "swipe_right";
                    break;
                case GestureType.ZoomIn:
                    Gesture = "Zoom In";
                    gestureName = "zoom_in";
                    break;
                case GestureType.ZoomOut:
                    Gesture = "Zoom Out";
                    gestureName = "zoom_out";
                    break;
                default:
                    break;
            }

            HttpGet("gesture", gestureName);
  
        }

        private void HttpUpdateIp(String ipAddress)
        {
            string address = string.Format("http://localhost/server/updateDeviceInfo.php?f=updateIp&device=kinect&ip=192.168.2.9");
            Console.WriteLine(address);
            string text;
            using (WebClient client = new WebClient())
            {
                text = client.DownloadString(address);
            }
            Console.WriteLine(text);
        }

        private void HttpGet(String featureName, String specName)
        {
            string address = string.Format("http://localhost/server/arubi.php?device=kinect&feature={0}&spec={1}", Uri.EscapeDataString(featureName), Uri.EscapeDataString(specName));
            Console.WriteLine(address);
            string text;
            using (WebClient client = new WebClient())
            {
                text = client.DownloadString(address);
            }
            Console.WriteLine(text);
        }

        //private void HttpPost()
        //{
        //    Console.WriteLine("testing");
        //    // Create a request using a URL that can receive a post. 
        //    WebRequest request = WebRequest.Create("http://www.contoso.com/PostAccepter.aspx ");
        //    // Set the Method property of the request to POST.
        //    request.Method = "POST";
        //    // Create POST data and convert it to a byte array.
        //    string postData = "This is a test that posts this string to a Web server.";
        //    byte[] byteArray = Encoding.UTF8.GetBytes(postData);
        //    // Set the ContentType property of the WebRequest.
        //    request.ContentType = "application/x-www-form-urlencoded";
        //    // Set the ContentLength property of the WebRequest.
        //    request.ContentLength = byteArray.Length;
        //    // Get the request stream.
        //    Stream dataStream = request.GetRequestStream();
        //    // Write the data to the request stream.
        //    dataStream.Write(byteArray, 0, byteArray.Length);
        //    // Close the Stream object.
        //    dataStream.Close();
        //    // Get the response.
        //    WebResponse response = request.GetResponse();
        //    // Display the status.
        //    Console.WriteLine(((HttpWebResponse)response).StatusDescription);
        //    // Get the stream containing content returned by the server.
        //    dataStream = response.GetResponseStream();
        //    // Open the stream using a StreamReader for easy access.
        //    StreamReader reader = new StreamReader(dataStream);
        //    // Read the content.
        //    string responseFromServer = reader.ReadToEnd();
        //    // Display the content.
        //    Console.WriteLine(responseFromServer);
        //    // Clean up the streams.
        //    reader.Close();
        //    dataStream.Close();
        //    response.Close();
        //}

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void OnSkeletonFrameReady(object sender, SkeletonFrameReadyEventArgs e)
        {
            using (SkeletonFrame frame = e.OpenSkeletonFrame())
            {
                if (frame == null)
                    return;

                // resize the skeletons array if needed
                if (skeletons.Length != frame.SkeletonArrayLength)
                {
                    skeletons = new Skeleton[frame.SkeletonArrayLength];
                }
                // get the skeleton data
                frame.CopySkeletonDataTo(skeletons);
                int count = 0;
                foreach (var skeleton in skeletons)
                {
                    // skip the skeleton if it is not being tracked
                    if (skeleton.TrackingState != SkeletonTrackingState.Tracked)
                        continue;

                    count++;
                   
                    // update the gesture controller
                    gestureController.UpdateAllGestures(skeleton);
                }

                //if (count != skCount)
                //{
                    //serialPort1.Open();
                        
                    //if (count == 0)
                    //{
                    //    if (serialPort1.IsOpen)
                    //    {
                    //        serialPort1.Write("0");
                    //        Console.WriteLine("LED High");
                    //    }
                    //}
                    //else if (count > 0)
                    //{
                    //    if (serialPort1.IsOpen)
                    //    {
                    //        serialPort1.Write("1");
                    //        Console.WriteLine("LED High");
                    //    }
                    //}
                    //skCount = count;
                    //serialPort1.Close();
                //}
            }
        }

        #endregion Event Handlers

    }
}
