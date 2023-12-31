song = ""
left_wrist_y = 0
right_wrist_y = 0
left_wrist_x = 0
right_wrist_x = 0

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(500, 500)
    canvas.center()
    webcam = createCapture(VIDEO)
    webcam.size(500, 500)
    webcam.hide()

poseNet=ml5.poseNet(webcam,modelLoaded)
poseNet.on("pose",gotPoses)

}
function modelLoaded() {
    console.log("The model has been loaded")
}

function draw() {
    image(webcam, 0, 0, 500, 500)
fill("red")
    stroke("red")
    circle(left_wrist_x,left_wrist_y,20)
    in_number_left_wrist=Number(left_wrist_y)
    remove_decimals=floor(in_number_left_wrist)
    volume=remove_decimals/500
    document.getElementById("volume").innerHTML="volume: "+ volume;
    circle(right_wrist_x,right_wrist_y,20)
}

function play() {
    song.play()
    song.setVolume(1)
    song.rate(1)


}
function gotPoses(result) {
    if (result.length>0){
    left_wrist_y=result[0].pose.leftWrist.y
    left_wrist_x=result[0].pose.leftWrist.x 
    right_wrist_y=result[0].pose.rightWrist.y
    left_wrist_x=result[0].pose.rightWrist.x
    console.log(left_wrist_x,"(Left Wrist X coordinates)",left_wrist_y,"(Left Wrist Y coordinates)")
    console.log(right_wrist_x,"(Right Wrist X coordinates)",right_wrist_y,"(Right Wrist Y coordinates)")
    }
}

function stop() {
    song.pause()
}