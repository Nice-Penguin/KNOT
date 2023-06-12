import React, { useState, useEffect, useRef, useTransition } from 'react';
import view from './change_view';
import { Chart } from "react-google-charts";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


const API_KEY = "";
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
    const [buttonText, setButtonText] = useState("GPT에게 질문하기");
    const [messages, setMessages] = useState([
        {
            message: "안녕하세요! 저는 ChatGPT 입니다. 무슨일이신가요?",
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
            <ScrollScript toggle={setToggle} index={0} script={`당신은 SSH를 Putty와 같은 외부 프로그램으로 사용하실 수 있습니다.
            그러나, KNOT는 설치가 필요없는, 웹 환경에서의 SSH 터미널을 지원합니다.`}></ScrollScript>
            <ScrollScript toggle={setToggle} index={1} script="더 나아가, KNOT는 인터넷만 연결된다면 어디서든지 사용할 수 있는 환경을 제공합니다. 당신이 캠핑을 하는 도중에도 말이죠."></ScrollScript>
            <ScrollScript index={2} script="또한, 많은 개발자들은 자주 사용하는 명령어를 치기 위해 키보드를 두드립니다."></ScrollScript>
            <ScrollScript index={3} script="그러나 이러한 피로도를 해결하는 솔루션을 제시합니다.
            당신은 간단한 명령어들을 버튼으로써 입력할 수 있습니다."></ScrollScript>
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
            <br /><br />
            <br /><br />
            <br /><br />
            <br /><br />
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
                scripts="KNOT는 KNOT's Not Only Terminal을 의미합니다.
                옛 해커식 작명법으로 명명된 이 프로젝트는, 당신에게 웹으로 사용가능한 SSH 웹 콘솔을 제시합니다."
                hname="직접 해보기" styleType="intro_link"></Script>
            <Image source="./image/hello.gif"></Image>
        </div>
    );
}

function Solution() {
    return (
        <div className="home_solution">
            <Image source="./image/touch_file.gif"></Image>
            <Script title="Solution" click={view.show_console}
                scripts="저희의 목적은 쉽게 사용할 수 있는 웹 SSH 콘솔의 제공입니다.
                리눅스에 처음이더라도, 친숙해지도록 버튼을 통해 명령어 입력을 지원합니다."
                hname="터미널 살펴보기" styleType="default_link"></Script>
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
                scripts={`리눅스에서는 다양한 명령어를 사용할 수 있습니다. 그 중 가장 기본적인 명령은 'ls'입니다.
                이 명령은 현재 디렉터리에 있는 파일과 디렉터리를 나열합니다. 다음으로 자주 사용되는 명령은 'cd'입니다.
                이 명령은 디렉터리를 변경하는 데 사용됩니다. 예를 들어 'cd /home/user'를 입력하면 '/home/user' 디렉토리로 이동합니다.
                'mkdir' 명령을 사용하여 새 디렉터리를 만들 수도 있습니다.
                레퍼런스에선, 여러분들에게 명령어들에 대한 설명을 제공합니다.`} click={view.show_reference}
                hname="레퍼런스 살펴보기" styleType="default_link"></Script>
            <Image source="./image/linux_command.jpeg"></Image>
        </div>
    );
}

function Linux() {
    return (
        <div className="home_Linux">
            <Script title={`What is "Linux"?`} link="https://www.redhat.com/en/topics/linux/what-is-linux" hname="더 알아보기" styleType="default_link"
                scripts={`Linux®는 오픈 소스 운영 체제(OS)입니다. 1991년 리누스 토발즈가 취미로 구상하고 만든 것이 시초입니다. 대학에 재학 중이던 라이너스는 유닉스의 원리와 설계를 기반으로 한 무료 오픈 소스 버전의 MINIX 운영 체제를 만들려고 했습니다. 
            이 취미는 이후 가장 많은 사용자 기반을 가진 OS, 공개적으로 사용 가능한 인터넷 서버에서 가장 많이 사용되는 OS, 가장 빠른 상위 500대 슈퍼컴퓨터에 사용되는 유일한 OS가 되었습니다.`} />
            <Image source="./image/figure_of_linux.png"></Image>
        </div>

    );
}

function SSH() {
    return (
        <div className="home_SSH">
            <Script title={`What is "SSH"?`} link="https://www.ssh.com/academy/ssh" hname="더 알아보기" styleType="default_link"
                scripts={`SSH 프로토콜은 암호화를 사용하여 클라이언트와 서버 간의 연결을 보호합니다. 모든 사용자 인증, 명령, 출력 및 파일 전송은 네트워크에서 공격으로부터 보호하기 위해 암호화됩니다. SSH 프로토콜의 작동 방식에 대한 자세한 내용은 프로토콜 페이지를 참조하세요. SSH 파일 전송 프로토콜을 이해하려면 SFTP 페이지를 참조하세요.`} />
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
