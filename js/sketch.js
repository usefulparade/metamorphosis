
let c;
let ms;
let s;
let counter;
let textBoxes;
let currentText;
let waitTime;
let fadeTime;
let paused, choice;
let textParent;

function setup()
{
    c = createCanvas(windowWidth, windowHeight);
    c.parent = document.querySelector("#p5canvas");
    ms = 0;
    s = 0;
    currentText = 0;
    waitTime = 4;
    fadeTime = 3;
    paused = false;
    choice = false;
    textBoxes = document.getElementsByClassName("textbox");
    textParent = document.getElementById("textParent");

    // for (i=0;i<textBoxes.length;i++)
    // {
    //     console.log(textBoxes[i]);
    // }

    // ActivateTextbox(textBoxes[currentText]);
    doThings();
}

function draw()
{

    ms += deltaTime;
    s = ms/1000;

    textAlign(RIGHT);
    text("" + floor(s) + " seconds", width-10, height-10);


}

async function doThings()
{

    ChangeFadeTime(random(0,10));
    AddTextbox(textBoxes[currentText]);
    await (sleep(0.2));
    FadeInTextbox(textBoxes[currentText]);

    await (sleep(waitTime));

    if (!paused && !choice)
    {
        if (currentText < textBoxes.length-1)
        {
            currentText++;
            doThings();
        }
        else
        {
            console.log("the end!");
            return;
        }
        
    }

}

function TextCrawl()
{
    for (i=0;i<textBoxes.length;i++)
    {

    }
}

function RestartClock()
{
    ms = 0;
}

function AddTextbox(textbox)
{
    textParent.appendChild(textbox);
    textParent.scrollTo(0, textParent.scrollHeight);
}

function FadeInTextbox(textbox)
{
    textbox.style.filter = "opacity(1)";
}

function ChangeFadeTime(seconds)
{
    document.documentElement.style.setProperty('--fade-in-time', '' + seconds + 's');
}

// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(secondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, secondsDuration * 1000);
  })
}

function MakeTextbox(text)
{

}



