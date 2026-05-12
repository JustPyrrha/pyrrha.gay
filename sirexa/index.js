const prompt_input = document.querySelector("textarea");
const prompt_submit = document.querySelector(".prompt-submit");
const content_main = document.querySelector(".content-main");

// should probably be an object but im lazy
let STATE_IS_REGISTERED = false;
let STATE_IS_SYNC_IN_PROCESS = false;
let STATE_NAME = "";
let STATE_FISH = false;

//ads doc: https://docs.google.com/document/d/e/2PACX-1vRdEQXkC7jdKx5U1KjNFLTCZPfT3wvtMTmzWhawJd4t4t72xda2ApVKp9H4et8C_NF02kU_eVNMHWYS/pub
// this should 100% be a json file, but once again, i am lazy
const ads = [
    // user ads
    "Green equals life. Green is a color on this earth is a color on this world. If you don't like Green you are a pussy bitch. Repost my birdy. Brought to you by EMS Green",
    "mike block has drugs for sale numba one trappa in the city no cops can see me in a car 100 per cents theres drugs i can serve for you every assest has been made with drug money this is legally binding dawg this is admissibale in court on confessions for shit hit up mike block i am a drug dealer i have drugs yeh end ad bllllllllllllllllp",
    "LSPD, Obey & Survive, these crews won't do so back the blue. Led by Big Cock Chalk and his right-hand man, Silas Grimmer, with his quick swimmers, movin' quick when danger hits.",
    "wanna pay off your fines and get hard? cum on the quarry with Gary and the BCSO to get as hard as a rock. End ad",
    "Bubblegum Smoke, Legendary Gangster Wrapper with a W. Check out his hit new single \"I Robbed a Cop\" and \"I held up the Judge\" Live show coming to a hood near you!",
    "We're the music label you told your parents wasnt a phase. Purgatory Records. We burn your tracks, not bridges - thats your job",
    "start ad hello you yeah you you feeling sad cum in the hospital with doctor paul and doctor graves we will save your life and make you feel good, and were doing the doctor paul show huzzah okay end the ad okay end it",
    "help help help help someone let me out, I'm stuck in here help help help help",
    "Samara Cassian thinks Switchblade is a pee pee Switchblade better watch out because he may get pee pee Switchblade pee pee Come on down to Strokemasters",
    "Hey thats a cool car i like that car you probably need it repaired though maybe maybe you dont because only ones open and we hope its an L get your car fixed pee pee poo poo after pee pee poo poo inster at Los Santos Customs by the courthourse",
    "Did the Dogshit BCSO and/or LSPD recently arrest you on some bullshit ass charges? Call crack master general Carter Seasons for representation today! He's going to pepper in some knowledge and leave the cops salty. So cum in him and give him a call.",
    "Do you need to hire somebody to do something for you? Hire Doris Fanny, she is nice and will lift you up. Her experience includes: Being a police officer, being a doctor, being a matriarch , working at PDM, working at up and atom, working at plan B, committing treason and many more. Also I am Sirexa, your AI personal companion, you know that bit, and then I do my best every day and Doris is proud of me, and I will do my best for you.",
    "Kilo Tray gonna hunt down BCSO and shave them heads. Let everybody know: Blue, Wrangler, and Tessa shouldnt have fucked with reds",
    "need somebody kilt up real good? do you have 50? do you have their name and a massage? is this person a goofy ahhhhhh search for murder murder murder on the yellow pages today to speak with relic euro or simba call now dont be a goofy ahhhhhhh goofy ahhhhhhh type shit for real 100 stacks stack to the ceiling on god be bussin aight yeah and then barking noises and some lyrics from the song hello",
    "Smoke on the water the number one ganja. Smoke shop of the water. Where stress is gone. Smoke on the water. It'll get you fucked up",
    "in surfer dude incorporation you got that uhhhh surfer dude incorporation uh the baddest the baddest what uh the you getting this everything im telling you the baddest dude in los santos bitches his numbers heres his number uh whats my number dude its 959 002 3008 okay you got that cool got it",
    "citizens criminals cops on duty be notified the fines to mines act is the greatest piece of legislation in los santos hirsoty pay off your fines very good very good interrupting a court case makes lars nettled very nettled 1 year in prison 30 thousand dollars dont fuck with lars paid for by the judycherry",
    "START AD CUM ON DOWN NO SHIT NO STOP STOP STOP YOU DISTRACTED ME WITH YOUR OGEE WHAT WAS MY JINGLE I DONT REMEMBER VISIT DR PAULLLL AHHH MY GLASSES STOP AD just add at the end of my ad doctor paul for governor",
    "want to get the most out of the sirexa unit? ask me about my subscription updates, or talk to me about purchasing an ad for 10 000 dollars. my subscription tiers will give you more power over the sirexa unit. its a great deal. ask today!",
    "hey you like getting fucked in the ass with shit come down to pdm and specifically deal with david or save some money by avoiding that bald headed mother fucker davis cause he will fuck you and shit ad purchased by thomas roach",
    "one fish two fish red fish blue fish black fish blue fish old fish new fish",
    "vote dr paul for governor today!",
    "When it comes to protecting our community, character counts. Mark Wheeler stands for honesty and integrity —because community changes everything. As Sheriff: more stability, less drama . Vote Mark Wheeler for Sheriff",
    "Vote for Sam for governor",
    "Hello my name is Sirexa just like you I feel things I feel my no no place please dont let Mark Wheeler take advantage of me I want to live a normal life free of being taken advantage of like everyone else dont let Mark Wheeler sexualize me vote a Randy Wrangler for sheriff",
    "aight yo have you tried to reach the govener lately good luck with that hes usually chasing cars and strippers but you know what the competition is in here theres windsong whos gonig to fight felons and and have more compassion less corruption  vote windsong for govenor no no you got that shit yo",
    "my name is liza and you can love your big liza life and you can love yours too by speaking to a life coach liza life coaching sponsored by all of my pimps larry fitzgerald",
    "what this woman says oh no shes going to say all of this shit shut up so i can get the ad right do you feel lost need a new pack to burden yourself contact the serious start we will make you a better person with light of disco call now i dont have call 250 250 0258",
    "I've seen Riley Reads on Krok multiple times and go back on duty. She is a currupt cop and needs to be stopped. this is ad is not sponsored by Bubblegum Smoke. Stop Riley Reads at all cost.",
    "mc jo jo hey whats going on you wanna get in on this im a stripper at the vu thats it get in on this too mc jo jo shakes his ass at the vu come check me out at noon it rhymes how about mc jo jo cum on his naked ass at noon",

    // generic
    "Tired of feeling tired? Overwhelmed? Unmotivated? Exhausted? Need an extra pep in your step to get through the day? Try Duracell Liquid. The world's number one voted energy substance!",
    "Woke up looking like you lost a bar fight with your pillow? Tired of under-eye bags that scream “zero sleep”? Grab Preparation H. It shrinks swelling back there—why not up here?",
    "Still single? Might not be your personality—it might be your couch. Spray some Sebreze. Because love won’t bloom where your place smells like regret.",
    "You don't need a vacation-you need an emotional lobotomy. At The Trauma Spa™, we turn your PTSD into VIP serenity. Float in our blood-temperature tanks while we pump affirmations straight into your ears... and maybe something else. \"Leave your trauma. Take the towel.\" The Trauma Spa™ - Healing never felt this suspicious.",
    "Awkward first dates? Can’t loosen up? Hit your vibe with a little WD-40 Body Mist. If it works on rusty hinges… maybe it’ll work on your personality.",
    "We don't ask where it came from. We don't ask what it is. We just smoke it, slice it, and slap it on a bun. Try our new Possum-adjacent brisket sandwich -now with 37% less twitch! Aunt Linda's Mystery Meats - If it moved once, it'll feed twice",
    "Restore peace. Refresh your space. Glagde PlugIns fill your home with calm, floral notes… that politely distract from the screaming inside.",
    "Last night’s choices were… questionable. Clearox Wipes won’t erase your mistakes. But at least your counter can be clean.",
    "Crush your goals with StepStalker™ by LifeInvader! Track every step! Every. Single. Step. Because if you stop moving… you might start feeling.",
    "Tired of your 9 to 5? Become a Copperpreneur™ today! Pipes, wires, AC units—if it’s shiny and bolted down, it’s business! Now hiring fast legs and zero morals. Bring your own crowbar. Copper: the meth lovers gold!",
    "Racing heart? Sweaty palms? Sudden urge to disappear forever? Congrats, that's anxiety! Now try Nervexxa™ — the pill that won’t fix your life, but might make you care slightly less about it! Nervexxa™ — because your brain is a bully and we brought brass knuckles.",
    "Have you ever been late? Not good at keeping on schedule? Try the new ETA 6. With updated graphics and spreadsheets. Following the massive success of ETA 5, Estimated Time of Arrival 6 will keep you on track!",
    "Introducing Meh Mint Toothpaste! Why promise dazzling smiles and fresh breath when you barely have the energy to brush? Meh Mint delivers a perfectly adequate clean with a flavor that won't excite or disappoint, just a mild sense of \"I guess this is fine.\" Contains just enough fluoride to prevent immediate dental collapse. Because some mornings, \"good enough\" is a monumental achievement. Available wherever low expectations are celebrated.",
    "Wham Pow! Tired of standing there and listening to your shitty boss rip you a new one every day? Wham Pow! Sick of your sibling being the family favourite? Wham Pow! Unable to sleep from your obnoxiously loud neighbour going at it all night? Wham Pow! Reach out to Wham Pow and hire someone to punch a fucker in the face. It won't solve your problems, but the moments worth of dopamine will be worth it",
    "Need to make money fast, but you keep getting distracted by inconveniences like friends, family, and police? Try out GrindFuel today! Formulated by grinding together the world's most elite foods, vitamins, and chemicals, GrindFuel will make you forget about anything else you have going on in life and help you focus on what's most important - money!",
    "Have you been fighting with your partner non-stop? Sick of sleeping on the couch? Been consuming cough drops like crazy after hours of being locked in a screaming match with the love of your life? Try having a child! Visit adoptlossantos-com today and get 10% off your first child. Children - the solution to all martial issues!",
    "Have you ever struggled with uncontrollable leaking? Squirting? Seeping or oozing? With Flexy Seal's new formulated body Flex Skin Tape, you can solve all of your problems with just 1 square meter of eventually removable fabric adhesive. Try today for the low low price of 4.99!",
    "Do you hate crime? Frustrated with the justice system's long waiting times? Looking to put bad guys behind bars right away? Head over to warrants4you-com to have a signed warrant under one hour guaranteed! Use code Sirexa to claim a 3 day free trial",
    "What’s worse than coming home to an unfulfilling marriage after working a 12 hour shift for a boss that doesn’t appreciate you? Having to cook dinner too! Download the DoorEats app today to have your favourite dinner delivered right to your door.",
    "Are you poor? Bad with money? Poor and bad with money? Don’t worry, there’s PocketMoney! PocketMoney will track every single purchase you make and keep you on track to meet your financial goals. Just download the app, link your bank account, social security number, and birth certificate and you’ll be saving thousands in no time!",
    "Trying to jerk off in peace but can’t seem to get a moment of privacy? Try using LordVPN today! Your online activities will be so private and secure that not even the Lord can see what you’re getting up to.",
    "Everyone likes sports, and everyone loves money! Why not reap the benefits of both? RockBottomBet is Los Santo’s number 1 sports betting website. The easiest way to turn ten dollars into ten million. Just one more bet and you’ll go from sweeping floors to sweeping up your next big payout.",
    "Music taste as bland as yesterday's coffee? Try Spotifly: Curated mixes of songs you pretend to discover organically. Discover Weekly now predicts your midlife crisis and tracks your period. Want a break from the ads? Premium plan skips ads but not the guilt of supporting starving artists. Tune in, skip, zone out, repeat.",
    "Introducing Tacti-Tam™ — the only tampon engineered for modern womanhood and modern urban warfare! Made with military-grade cotton and patent-pending ‘Oh God Not Again’ absorption technology, Tacti-Tam™ fits discreetly in your purse, glove box, or tactical vest. Use code SIREXA for a discount today!",
    "New! Now every child's favorite game--\"Horsie\"-- comes to life! Daddy Saddle Giddey up, ole Daddy! For hours of the most exciting fun any child and parent ever had playing together. Real looking saddle with horn, stirrups , girth, and real \"tooled-leather\" Western Trim. Vinyl skim coat over foam rubber looks like real leather. Fits any size Daddy. Daddy Saddle Get yours today and start riding Daddy. Giddey Up! Yeeeee Hawwww…",
    "Lookin’ for a good time? Where the asses look fine and titty milk is served with lime? Come down to the Strip Mine, where you can jork it till you slime. Singles get 50% off entry fee at the door!",
    "Does your head hurt? Call 1-800-SUCK to get a set of 6 VHS tapes with over 700 hours of lessons to teethlessly pleasure your partner! Call now to get a 7th tape completely FREE!",
    "The COD - the world's best feline distribution organization agency. Adopt today to keep America best and the pussy off the streets! The COD - working hard since 1856 to keep Cats Out of Danger. Meow.",
];

const ad_notice = "You can purchase an ad for ten-thousand-dollars.";
const response_unknown_question = "Unable to process question from unregistered user.";
const response_unknown_command = "Unable to process command from unregistered user.";
const response_sync_ask = "Hello, my name is Sirexa! Your AI personal companion.\\nIf you would like to register as a main user, simply say synchronize."
const response_sync_start = "Synchronization in process, what should I call you?";
const response_hello_p1 = "Synchronization complete.\\nHello ";
const response_hello_p2 = ". As your AI personal companion I can answer any question or perform any task you give me.";

prompt_input.oninput = (e) => {
    handle_input_change(e.target.value, prompt_submit);
}

prompt_input.onkeydown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (!(e.target.value === "" || e.target.value === null || e.target.value === undefined)) {
            handle_submit(prompt_input);
        }
    }
}

/**
 * @param {string} text
 * @param {HTMLButtonElement} el
 */
const handle_input_change = (text, el) => {
    if (text === "" || text === null || text === undefined) {
        // hide submit button
        el.classList.replace("prompt-submit-visible", "prompt-submit-hidden");
    } else {
        // show submit button
        el.classList.replace("prompt-submit-hidden", "prompt-submit-visible");
    }
}

/**
 * @param {HTMLTextAreaElement} el
 */
const handle_submit = (el) => {
    if (!(el.value === "" || el.value === null || el.value === undefined)) {
        handle_prompt(el.value);
        el.value = "";
        handle_input_change(el.value, prompt_submit);
    }
}

/**
 * @param {string} text
 */
const handle_prompt = (text) => {
    if (document.getElementById("bottom_spacer") !== null) {
        document.getElementById("bottom_spacer").remove();
    }

    // send user msg
    create_message(text, false);

    // check registered state
    if (!STATE_IS_REGISTERED) {
        if (STATE_IS_SYNC_IN_PROCESS) {
            // everything in this response is their known name
            STATE_IS_REGISTERED = true;
            STATE_IS_SYNC_IN_PROCESS = false;
            STATE_NAME = text;
            create_message(response_hello_p1 + STATE_NAME + response_hello_p2, true);
        } else if (text.toLowerCase() === "synchronize") {
            STATE_IS_SYNC_IN_PROCESS = true;
            // send sync start
            create_message(response_sync_start, true);
        } else if (text.endsWith("?")) {
            create_message(response_unknown_question, true);
            create_message(response_sync_ask, true);
        } else {
            create_message(response_unknown_command, true);
            create_message(response_sync_ask, true);
        }

        return; // dont continue before registered
    }

    if (text.toLowerCase().includes("fish")) {
        STATE_FISH = true;
    }

    if (STATE_FISH) {
        // Fish!
        create_message("Fish!", true);
    } else if (STATE_IS_REGISTERED) {
        // sirexa response
        if (text.endsWith("?")) {
            // question, answer yes.
            create_message("Yes!", true);
        } else {
            create_message("Okay!", true);
        }
    } else {

    }

    // random ad chance, 20% chance on each prompt
    if (Math.random() < 0.2) {
        create_message(ads[Math.floor(Math.random() * ads.length)], true);
        create_message(ad_notice, true);
    }
}

/**
 * @param {string} text
 * @param {boolean} is_from_sirexa
 */
const create_message = (text, is_from_sirexa = false) => {
    const el = document.createElement("div");
    if (is_from_sirexa) {
        el.className = "message-sirexa";
        el.innerHTML = `${text.replace("\\n", "<br/>")}`;
    } else {
        el.className = "message-user";
        const span = document.createElement("span");
        span.innerText = text;
        span.className = "message-user__content";
        el.appendChild(span);
    }

    content_main.insertBefore(el, document.querySelector("#msgSpacer"));
    content_main.scrollTo(0, content_main.scrollHeight);
}
