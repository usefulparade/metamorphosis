
let c;
let ms;
let s;
let counter;
let textBoxes;
let playhead;
let playSpeed;
let waitTime;
let fadeTime;
let paused, choice;
let textParent;
let script;

let choiceScriptA, choiceScriptB;
let choiceButtonA, choiceButtonB;

let audio = [];
let audioNames = [
    'bug_loop.mp3',
    'come_out.mp3',
    'dont_leave.mp3',
    'fire.mp3',
    'hide.mp3',
    'if_he_only.mp3',
    'keep_sleeping.mp3',
    'milk.mp3',
    'open_the_door.mp3',
    'quarter_to_seven.mp3',
    'release_your_last_breath.mp3',
    'rotten_food.mp3',
    'section3.mp3',
    'stop_eating.mp3',
    'swoonlike_sleep.mp3',
    'try_to_get_up.mp3',
];

let skip = [];

let timescale;

let mute, pause, credits;

function preload()
{
    script = loadStrings('./script.txt');

    for (i=0;i<audioNames.length;i++)
    {
        audio[i] = loadSound('./assets/audio/' + audioNames[i]);
    }


}

function setup()
{
    // c = createCanvas(windowWidth, windowHeight);
    // c.parent = document.querySelector("#p5canvas");
    noCanvas();
    ms = 0;
    s = 0;
    playhead = 0;
    waitTime = 4;
    fadeTime = 3;
    paused = false;
    choice = 0;
    timescale = 1000; // CHANGE THIS TO 1000 for seconds!
    textBoxes = document.getElementsByClassName("textbox");
    textParent = document.getElementById("textParent");

    script = script.filter(v=>v!="");
    console.log(script);

    mute = false;
    pause = false;
    credits = false;

    DoThings();

    let menuicon = document.getElementById("menuicon");
    menuicon.classList.add('menuicon-loaded');

    let preload = document.getElementById("preload");
    preload.classList.add("preload-fade");
}

function draw()
{

    ms += deltaTime;
    s = ms/1000;

    // textAlign(RIGHT);
    // text("" + floor(s) + " seconds", width-10, height-10);


}

async function DoThings()
{
    while (skip.indexOf(playhead) != -1)
    {
        console.log('skipped line ' + playhead);
        playhead++;
    }

    let line = script[playhead].trim();
    let div;
    let box;
    let p;
    let button;

    switch (line[0])
    {
        case '*':
            let cmd, val;
            if (line.indexOf(":") != -1)
            {
                cmd = line.slice(1,line.indexOf(":"));
                val = line.slice(line.indexOf(":")+1);
                console.log("set " + cmd + " to " + val);
            }
            else if (line == "*choice")
            {
                cmd = 'choice';
                val = '0';
                console.log("choice!");
            }
            else
            {
                cmd = '';
                val = '';
            }
            
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
                    thisAudioIndex = audioNames.indexOf("" + val);
                    if (thisAudioIndex >= 0)
                    {
                        audio[thisAudioIndex].play();
                    }
                    
                    break;
                
                case 'animate':
                    // show an image here!

                    thisgif = document.getElementById(val);
                    thisgif.style.display = "block";
                    break;
                
                case 'animate-end':
                    // swap a gif for its still png

                    thisgif = document.getElementById(val);
                    thisgif.style.display = "none";
                    break;

                case 'animate-fadeout':
                    // swap a gif for its still png

                    thisgif = document.getElementById(val);
                    thisgif.style.filter = "opacity(0)";
                    break;

                case 'animate-swap':
                    // swap a gif for its still png
                    val = val.split(",");
                    oldimg = document.getElementById(val[0]);
                    newimg = document.getElementById(val[1]);
                    oldimg.src = "./assets/img/" + val[1];
                    // oldimg.id = '' + val[1];
                    
                    break;

                case 'choice':
                    // make two buttons!
                    let choiceLine;
                    let choicePlayhead = playhead+1;

                    let choices = [];
                    choiceScriptA = [];
                    choiceScriptB = [];

                    while (script[choicePlayhead][0] == ' ')
                    {
                        choiceLine = script[choicePlayhead].trim();

                        if (choiceLine[0] == '#')
                        {
                            choices.push(choiceLine);
                        }

                        if (choices.length < 2)
                        {
                            choiceScriptA.push(choicePlayhead);
                        }
                        else
                        {
                            choiceScriptB.push(choicePlayhead);
                        }
                        

                        choicePlayhead++;
                    }

                    box = MakeTextbox("textbox button");
                    choiceButtonA = MakeChoiceButton(choices[0], 0);
                    choiceButtonB = MakeChoiceButton(choices[1], 1);

                    CombineChoices(choiceButtonA, choiceButtonB, box);

                    console.log("choices: " + choices);
                    console.log("choice A: " + choiceScriptA);
                    console.log("choice B: " + choiceScriptB);

                    paused = true;

                    break;

                default:
                    console.log("couldn't parse cmd");
                    break;

            }

            
            


            break;

        case '#':
            // make a button!
            box = MakeTextbox("textbox button");
            button = MakeButton(line);
            
            CombineTextbox(button, box);
            paused = true;
            break;


        
        default: // this catches all regular lines!
            let mod = '';

            if (line.indexOf('<') != -1)
            {
                mod = line.slice(1,line.indexOf('>'));
                console.log(mod);
                line = line.slice(line.indexOf('>')+1);
            }

            box = MakeTextbox("textbox");
            p = MakeText(line);

            if (mod != null)
            {
                mod = mod.split(":");
                p.style(mod[0],mod[1]);
                
            }
            

            CombineTextbox(p, box);

            await (sleep(playSpeed));
            break;

    }

    if (!paused)
    {
        if (playhead < script.length-1)
        {
            playhead++;
            DoThings();
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

function Unpause(btn)
{
    if (btn.dataset.clicked == 'false')
    {
        btn.dataset.clicked = 'true';     
        paused = false;
        playhead++;
        DoThings(); 
    }
     

}

function MakeTextbox(textboxClass)
{
    let div;
    div = createDiv();
    div.class(textboxClass);
    div.parent(textParent);
    return div;
    
}

function MakeText(line)
{
    let p;
    console.log('text: ' + line);
    p = createP(line);
    return p;
}

function MakeButton(line)
{
    let button;

    console.log("button: " + line);
    button = createButton(line.slice(1));
    button.elt.dataset.clicked = false;
    button.elt.setAttribute('onclick', 'Unpause(this)');
    return button;
}

function MakeChoiceButton(line, id)
{
    let button;
    console.log("choice button: " + line);

    button = createButton(line.slice(1));
    button.elt.dataset.clicked = false;
    

    if (id == 0)
    {
        button.elt.setAttribute('onclick', 'ChoiceA(this)');
    }
    else
    {
        button.elt.setAttribute('onclick', 'ChoiceB(this)');
    }
    return button;
}

function CombineTextbox(text, box)
{
    text.parent(box);
    textParent.scrollTo(0, textParent.scrollHeight);
    FadeInTextbox(box);
}

function CombineChoices(choiceA, choiceB, box, textA, textB)
{
    choiceA.parent(box);
    choiceB.parent(box);

    textParent.scrollTo(0, textParent.scrollHeight);
    FadeInTextbox(box);
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
    setTimeout(resolve, secondsDuration * timescale);
  })
}

function ChoiceA(btn)
{
    if (btn.dataset.clicked == 'false')
    {
        btn.dataset.clicked = 'true'
        choice = 0;
        ResolveChoice();
    }
   
}

function ChoiceB(btn)
{
    if (btn.dataset.clicked == 'false')
    {
        btn.dataset.clicked = 'true'
        choice = 1;
        ResolveChoice();
    }
}

function ResolveChoice()
{
    let skippedLines = [];

    if (choice == 0)
    {
        skippedLines = choiceScriptB;
        choiceButtonB.elt.style.display = "none";
        playhead = choiceScriptA[0];
    }
    else
    {
        skippedLines = choiceScriptA;
        choiceButtonA.elt.style.display = "none";
        playhead = choiceScriptB[0];
    }

    for (i=0;i<skippedLines.length;i++)
    {
        skip.push(skippedLines[i]);
    }

    paused = false;
    playhead++;
    DoThings();
}

function ParseScript(txt)
{

}

function controlsClicked(icon)
{
    icon.classList.toggle('controls-active');
    let menu = document.getElementById('menu');
    menu.classList.toggle('menu-open');
}

function ToggleMenuIcon(icon)
{
    
    let type = icon.id;

    switch (type)
    {
        case "mute":
            mute = !mute;
            icon.classList.toggle('menu-active');
            if (mute)
            {
                outputVolume(0);
                icon.classList.remove("fa-volume-high");
                icon.classList.add("fa-volume-xmark");
            }
            else
            {
                outputVolume(1);
                icon.classList.add("fa-volume-high");
                icon.classList.remove("fa-volume-xmark");
            }
            console.log('toggle mute: ' + mute);
            break;
        
        case "pause":
            pause = !pause;
            icon.classList.toggle('menu-active');
            if (pause)
            {
                Pause();
            }
            else
            {
                Unpause();
            }
            console.log('toggle pause: ' + pause);
            break;
        case "reload":
            location.reload();
            break;
        
        case "credits":
            credits = !credits;
            
            ToggleCredits();
            
            console.log('toggle credits: ' + credits);
            break;

        default:
            console.log('not sure what this button is!');
            break;
    }   
}

function ToggleCredits()
{
    let modal = document.getElementById("creditsmodal");
    if (credits)
    {
        modal.classList.add('creditsmodal-open');
    }
    else
    {
        modal.classList.remove('creditsmodal-open');
    }
}

function CloseCredits()
{
    credits = false;
    ToggleCredits();
}

