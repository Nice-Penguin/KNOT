import React, { useState, useEffect, useRef, useTransition } from 'react';
import view from './change_view';
import { Chart } from "react-google-charts";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


const API_KEY = "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";
const systemMessage = { 
    "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}



function Home() {

    return (
        <div className="homepage" style={{}}>
            {/* <Title></Title> */}
            <Introduce className="home_introduce"></Introduce>
            <Techstack></Techstack>
            <Interaction></Interaction>

            <Solution></Solution>
            <Description></Description>
            <ChatBot></ChatBot>
            <SSH></SSH>
            <Linux></Linux>

            <AboutUs></AboutUs>

            <div className="home_background1" ></div>
        </div>
    );

}

function ChatBot() {
    const [isChatting, setIsChatting] = useState(false);
    const [visible, setVisible] = useState(
        {
            display: "none",
            position: "relative", 
            height: "80%",
            width: "100%"
        }
    )
    const [buttonText, setButtonText] = useState("Learn more with GPT");
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm ChatGPT! Ask me anything!",
            sentTime: "just now",
            sender: "ChatGPT"
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user"
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {

        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage, 
                ...apiMessages 
            ]
        }

        await fetch("https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            }).then((data) => {
                return data.json();
            }).then((data) => {
                console.log(data);
                setMessages([...chatMessages, {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }]);
                setIsTyping(false);
            });
    }

    function chageToggle(){
        setIsChatting(isChatting ? false : true);
        if (isChatting){
            setVisible((prevState)=>{
                return {...prevState, display: "none"}
            });
            setButtonText("Learn more with GPT");

        }else{
            setVisible((prevState)=>{
                return {...prevState, display: "flex"}
            });
            setButtonText("Close GPT");
        }
        console.log(visible);
    }
    return (
        <div className="home_chatbot">
            <div style={visible}>
                <MainContainer>
                    <ChatContainer>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
                        >
                            {messages.map((message, i) => {
                                console.log(message)
                                return <Message key={i} model={message} />
                            })}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>

            </div>
            <div className="home_chat_button">
                    <a className={"intro_link"} onClick={chageToggle} >{buttonText}</a>
            </div>
        </div>


    );
}

function Interaction() {
    const { toggle, setToggle } = useState(0);
    const data = [["Command", "Frequency", { role: "style" }],
    ["ls", 3435, "red"],
    ["cd", 3132, "red"],
    ["git", 2387, "blue"],
    ["python", 1879, "blue"],
    ["rm", 1682, "blue"],
    ["vim", 1521, "blue"],
    ["j", 755, "blue"],
    ["tmux", 555, "blue"],
    ["source", 422, "blue"],
    ["mv", 311, "blue"],
    ["which", 265, "blue"],
    ["ssh", 111, "blue"],
    ["cp", 99, "blue"],
    ["mkdir", 24, "blue"]
    ];

    const option = {
        title: "frequently executed commands",
        hAxis: { title: "Command" },
        vAxis: { title: "Frequency" },
        legend: "none",
        animation: {
            "startup": true,
            duration: 1000,
            easing: 'out',
        }
    };

    return (
        <div className='home_interaction'>
            <div className='home_scroll_images'>
                <ScrollImage opacity={toggle == 0 ? 1 : null} source="./image/putty.jpg"></ScrollImage>
                <ScrollImage opacity={toggle == 1 ? 1 : null} source="./image/camping.jpg"></ScrollImage>
                <div className="home_scroll_image">
                    <Chart
                        chartType="ColumnChart"
                        data={data}
                        options={option}
                        width="100%"
                        height="400px"
                        position="absolute"
                        legendToggle></Chart>
                </div>
            </div>
            <ScrollScript toggle={setToggle} index={0} script={`You can use ssh like putty. And it is only available in Windows environment.
            However, KNOT can be used in any environment connected to the Internet, macOS, Linux environment, even mobile.`}></ScrollScript>
            <ScrollScript toggle={setToggle} index={1} script="Furthermore, you can access your server from anywhere with an internet connection. Even if you go camping."></ScrollScript>
            <ScrollScript index={2} script="In fact, did you know that most of the developers repeat certain commands?"></ScrollScript>
            <ScrollScript index={3} script="Don't worry if you don't have a keyboard.
            You can easily execute commands by pressing a button."></ScrollScript>
            <ScrollScript></ScrollScript>
        </div>
    );
}

// You can use ssh like putty. And it is only available in Windows environment. However, KNOT can be used in any environment connected to the Internet, macOS, Linux environment, even mobile.

// Furthermore, you can access your server from anywhere with an internet connection. Even if you go camping.

// In fact, did you know that most of the developers repeat certain commands?

// Don't worry if you don't have a keyboard.
// You can easily execute commands by pressing a button.

function ScrollScript(props) {
    const scrollRef = useRef(null);
    const [opacityValue, setOpacity] = useState(0);
    //const scrollImage = document.getElementsByClassName("home_scroll_image");

    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        }
    }, [scrollRef.current]);

    const scrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect();
        if (scroll.y < window.innerHeight * 0.1 &&
            scroll.y > window.innerHeight * 0.8) {
            setOpacity(1);
            //props.toggle.setToggle(props.index);
        } else {
            //setOpacity(0);
        }
    }
    return (
        <div ref={scrollRef} className='home_scroll_script' style={{ opacity: 1, transition: "1s" }}>
            <p>{props.script}</p>
        </div>
    );
}

function ScrollImage(props) {
    const scrollRef = useRef(null);
    const [opacityValue, setOpacity] = useState(0);

    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        }
    }, [scrollRef.current]);

    const scrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect();
        if (scroll.y < window.innerHeight * 0.6) {
            setOpacity(1);
        }
    }
    return (
        <div className="home_scroll_image" ref={scrollRef} style={{ opacity: opacityValue, transition: "1s" }}>
            <img src={require(`${props.source}`)}></img>
        </div>
    );
}

function Introduce() {

    return (
        <div className="home_introduce">
            <Script title="KNOT" click={view.show_console}
                scripts="KNOT, short for KNOT is Not Only Ternimal, means a terminal other than ssh that is simply used as a button. 
                Named in the old hacker style, this site presents you with a new type of web console."
                hname="Try It Yourself" styleType="intro_link"></Script>
            <Image source="./image/hello.gif"></Image>
        </div>
    );
}

function Solution() {
    return (
        <div className="home_solution">
            <Image source="./image/touch_file.gif"></Image>
            <Script title="Solution" click={view.show_console}
                scripts="Our purpose is to provide a UI-based terminal to make it easier and simpler to use.
                It is easy to use and shows high accessibility even to those who are new to Linux."
                hname="Learn More..." styleType="default_link"></Script>
        </div>
    );
}

function Description() {

    const scrollRef = useRef(null);
    const [opacityValue, setOpacity] = useState(0);

    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        }
    }, [scrollRef.current]);

    const scrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect();
        if (scroll.y < window.innerHeight * 0.6) {
            setOpacity(1);
        }
    }


    return (
        <div className="home_description" ref={scrollRef} style={{ opacity: opacityValue, transition: "1s" }}>
            <Script title="Reference"
                scripts={`Various commands are available in Linux. Among them, the most basic command is 'ls'.
                This command lists the files and directories in the current directory. The next most frequently used command is 'cd'.
                This command is used to change directories. For example, typing 'cd /home/user' will take you to the '/home/user' directory.
                You can also create a new directory by using the ‘mkdir’ command.`} click={view.show_reference}
                hname="Look Around Reference..." styleType="default_link"></Script>
            <Image source="./image/linux_command.jpeg"></Image>
        </div>
    );
}

function Linux() {
    return (
        <div className="home_Linux">
            <Script title={`What is "Linux"?`} link="https://www.redhat.com/en/topics/linux/what-is-linux" hname="더 알아보기" styleType="default_link"
                scripts={`Linux® is an open source operating system (OS). It was originally conceived of and created as a hobby by Linus Torvalds in 1991. Linus, while at university, sought to create an alternative, free, open source version of the MINIX operating system, which was itself based on the principles and design of Unix. 
            That hobby has since become the OS with the largest user base, the most-used OS on publicly available internet servers, and the only OS used on the top 500 fastest supercomputers.`} />
            <Image source="./image/figure_of_linux.png"></Image>
        </div>

    );
}

function SSH() {
    return (
        <div className="home_SSH">
            <Script title={`What is "SSH"?`} link="https://www.ssh.com/academy/ssh" hname="더 알아보기" styleType="default_link"
                scripts={`The SSH protocol uses encryption to secure the connection between a client and a server. All user authentication, commands, output, and file transfers are encrypted to protect against attacks in the network. For details of how the SSH protocol works, see the protocol page. To understand the SSH File Transfer Protocol, see the SFTP page.`} />
            <Image source="./image/figure_of_ssh.jpg"></Image>
        </div>

    );
}

function Techstack(props) {
    const src_dir = [
        "css3", "html5", "linux", "javascript", "react", "ssh",
    ]
    const windowSize = window.innerWidth
    const [positions, setPositions] = useState([
        0,
        windowSize * 0.155,
        windowSize * 0.31,
        windowSize * 0.465,
        windowSize * 0.62,
        windowSize * 0.775,
    ]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setPositions(prevPositions => {
                return prevPositions.map(prevPosition => {
                    const newPosition = prevPosition - 0.1;
                    if (newPosition <= windowSize * -0.13) {
                        return windowSize * 0.80;
                    }
                    return newPosition;
                });
            });
        }, 5);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className='home_techstack'>
            <h1>Tech Stacks</h1>
            <div style={{ height: "10rem", position: 'relative', overflow: "hidden" }}>
                {positions.map((position, index) => (
                    <img key={index} src={require(`./image/tech_stack/${src_dir[index]}.png`)} style={{ width: "10rem", height: "10rem", position: 'absolute', left: position }} />
                ))}
            </div>
        </div>

    );
}

function AboutUs() {
    return (
        <div className="home_about_us">
            <Script title={`About Us`} hname="About Us" styleType="default_link"
                click={view.show_about} scripts={`To know more about us click the button below`} />

        </div>

    );
}


function Script(props) {
    const scrollRef = useRef(null);
    const [opacityValue, setOpacity] = useState(0);

    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        }
    }, [scrollRef.current]);

    const scrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect();
        if (scroll.y < window.innerHeight * 0.6) {
            setOpacity(1);
        }
    }
    return (
        <div className="home_script" ref={scrollRef} style={{ opacity: opacityValue, transition: "1s" }}>
            <h1>{props.title}</h1>
            <p>{props.scripts}</p>
            <a className={props.styleType} onClick={props.click} href={props.link} >{props.hname}</a>
        </div>
    );

}

function Image(props) {
    const scrollRef = useRef(null);
    const [opacityValue, setOpacity] = useState(0);

    useEffect(() => {
        if (!scrollRef.current) return;
        window.addEventListener("scroll", scrollEvent);
        return () => {
            window.removeEventListener("scroll", scrollEvent);
        }
    }, [scrollRef.current]);

    const scrollEvent = () => {
        const scroll = scrollRef.current.getBoundingClientRect();
        if (scroll.y < window.innerHeight * 0.6) {
            setOpacity(1);
        }
    }
    return (
        <div className="home_image" ref={scrollRef} style={{ opacity: opacityValue, transition: "1s" }}>
            <img src={require(`${props.source}`)}></img>
        </div>
    );
}

function Button(props) {
    return (
        <div className="home_button">
            <input type="button">{props.value}</input>
        </div>
    );
}

export default Home;
