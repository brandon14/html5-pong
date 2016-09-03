<!DOCTYPE html>
<html lang="en">
<head>
  <!-- General metadata -->
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport"              content="width=device-width, initial-scale=1">
  <meta name="description"           content="A website I made to create a simple HTML5 pong game.">
  <meta name="author"                content="Brandon Clothier">
  <link rel="copyright"              href="#copyright">

  <!-- Theme meta for Google Chrome on Android -->
  <meta name="theme-color"           content="#ff5722">

  <title>An HTML5 pong game by Brandon Clothier</title>

  <!-- Material Design fonts -->
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">
  <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons">

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

  <!-- Bootstrap Material Design -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap.material-design/0.5.10/css/bootstrap-material-design.min.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/bootstrap.material-design/0.5.10/css/ripples.min.css">

  <!-- Bootstrap Social Buttons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.0.0/bootstrap-social.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../css/offcanvas.css">
  <link rel="stylesheet" href="../css/brandon.css">
  <link rel="stylesheet" href="css/pong.css">

  <!-- HTML5 Shim and Respond.js and rem.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
    <script type="text/javascript" src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script type="text/javascript" src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/rem/1.3.4/js/rem.min.js"></script>
  <![endif]-->
</head>

<body>
<!-- Navbar -->
<nav class="navbar navbar-fixed-top navbar-default" role="navigation">
  <div class="container">
    <!-- Navbar header -->
    <div class="navbar-header">
      <a class="navbar-brand" href="./">HTML5 Pong</a>
      <!-- Navbar collapse button -->
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
              data-target="#navbar" aria-expanded="false" aria-controls="navbar">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <!-- End navbar collapse button -->
    </div>
    <!-- End navbar header -->
    <!-- Navbar items -->
    <div id="navbar" class="collapse navbar-collapse">
      <ul id="navbar-items" class="nav navbar-nav">
        <li><a href="../">Home</a></li>
      </ul>
    </div>
    <!-- End navbar items -->
  </div>
</nav>
<!-- End navbar -->

<!-- Bootstrap container for the pong HTML -->
<div class="container">
  <!-- Jumbotron yo -->
  <div class="jumbotron">
    <h2>HTML5 Pong</h2>
    <h4>By: Brandon Clothier</h4>
    <br/>
    <br/>
    <!-- Controls div -->
    <div id="controls">
      <h3>Controls</h3>
      <ul>
        <li>P1 UP -> W</li>
        <li>P1 DOWN -> S</li>
        <li>P2 UP -> Osw</li>
        <li>P2 DOWN -> K</li>
        <li>START/PAUSE -> SPACEBAR</li>
        <li>RESET -> R</li>
      </ul>
    </div>
    <!-- End controls -->
    <!-- Canvas holder -->
    <div id="canvas-holder">
      <canvas id="canvas" width="640" height="480">
        Sorry, your browser does not support HTML5 canvas.
      </canvas>
    </div>
    <!-- End canvas holder -->
    <!-- Screen too small message -->
    <div id="screen-too-small" hidden>
      <h3>I am sorry, the screen is too small!<br/>
      This game needs a screen size of at least 750px wide to play!</h3>
    </div>
    <!-- End screen too small message -->
  </div>
  <!-- End jumbotron -->
</div>
<!-- End container -->

<!-- Footer -->
<footer class="footer">
  <div class="container">
    <div id="copyright">
      Copyright &copy; <?php echo date('Y') ?> - Brandon Clothier
    </div>
  </div>
</footer>
<!-- End footer -->

<!-- Dark overlay -->
<div class="dark-overlay" hidden>
</div>
<!-- Dark overlay -->

<!-- Scripts -->
<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script type="text/javascript">
  window.jQuery
</script>
<!-- Bootstrap javascript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<!-- Material design theme for Bootstrap javascript -->
<script src="https://cdn.jsdelivr.net/bootstrap.material-design/0.5.10/js/material.min.js"></script>
<script src="https://cdn.jsdelivr.net/bootstrap.material-design/0.5.10/js/ripples.min.js"></script>
<!-- JavaSCript functions for the page operation -->
<script src="../js/brandon-page-functions.js"></script>
<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
<script src="https://maxcdn.bootstrapcdn.com/js/ie10-viewport-bug-workaround.js"></script>
<!-- Init material design bootstrap -->
<script type="text/javascript">
  $.material.init();
</script>
<script src="js/pong.js"></script>
</body>
</html>
