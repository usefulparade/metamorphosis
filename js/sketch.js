
let c;
let ms;
let s;
let counter;
let textBoxes;
let currentText;
let playhead;
let playSpeed;
let waitTime;
let fadeTime;
let paused, choice;
let textParent;

let script;

function preload()
{
    script = loadStrings('./script.txt');
}

function setup()
{
    c = createCanvas(windowWidth, windowHeight);
    c.parent = document.querySelector("#p5canvas");
    ms = 0;
    s = 0;
    currentText = 0;
    playhead = 0;
    waitTime = 4;
    fadeTime = 3;
    paused = false;
    choice = false;
    textBoxes = document.getElementsByClassName("textbox");
    textParent = document.getElementById("textParent");

    script = script.filter(v=>v!="");
    console.log(script);

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
    let line = script[playhead].trim();
    let div;
    let p;
    let button;

    switch (line[0])
    {
        case '*':
            let cmd = line.slice(1,line.indexOf(":"));
            let val = line.slice(line.indexOf(":")+1);
            console.log("set " + cmd + " to " + val);

            switch (cmd)
            {
                case 'fade':
                    val = parseFloat(val);
                    ChangeFadeTime(val);
                    break;
                
                case 'speed':
                    val = parseFloat(val);
                    playSpeed = val;
                    break;

                case 'wait':
                    waitTime = val;
                    await (sleep(val));
                    break;

                case 'play':

                    // play an audio file here!
                    break;
                
                case 'animate':
                    // show a gif here!
                    break;

                case 'choice':
                    // make two buttons!
                    break;

                default:
                    console.log("couldn't parse cmd");
                    break;

            }

            
            


            break;

        case '#':
            // make a button!
            console.log("button: " + line);
            div = createDiv();
            div.class('textbox button');
            button = createButton(line.slice(1));
            button.mousePressed(Unpause);

            button.parent(div);
            div.parent(textParent);
            textParent.scrollTo(0, textParent.scrollHeight);
            FadeInTextbox(div);
            paused = true;
            break;


        
        default:
            console.log('text: ' + line);
            div = createDiv();
            div.class('textbox');
            p = createP(line);

            p.parent(div);
            div.parent(textParent);
            textParent.scrollTo(0, textParent.scrollHeight);
            FadeInTextbox(div);
            await (sleep(playSpeed));
            break;

    }

    // ChangeFadeTime(random(0,10));
    // AddTextbox(textBoxes[currentText]);
    // await (sleep(0.2));
    // FadeInTextbox(textBoxes[currentText]);

    // await (sleep(waitTime));

    // if (textBoxes[currentText].classList.contains("single-button"))
    // {
    //     paused = true;
    // }

    if (!paused && !choice)
    {
        if (playhead < script.length-1)
        {
            playhead++;
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

function Pause()
{
    paused = true;
}

function Unpause()
{
    paused = false;
    playhead++;
    currentText++;
    doThings(); 
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
    textbox.elt.style.filter = "opacity(1)";
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

function ParseScript(txt)
{

}



