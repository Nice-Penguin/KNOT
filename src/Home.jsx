import React, { useState, useEffect } from 'react'

function Home() {
    // let observer = new IntersectionObserver((e)=>{
    //     e.forEach((box)=>{
    //         if (box.isIntersecting){
    //             box.target.style.opacity = 1;
    //         }
    //         else{

    //         }
    //     });

    // });
    // let homepage = document.getElementsByClassName("homepage")[0];
    // observer.observe(homepage);

    // window.addEventListener("scroll", function(event){

    // 	var top = this.scrollY;

    // 	var layers = document.getElementsByClassName("parallax");
    // 	var layer, speed, yPos;
    // 	for (var i = 0; i < layers.length; i++) {
    // 		layer = layers[i];
    // 		speed = layer.getAttribute('data-speed');
    // 		var yPos = -(top * speed / 100);
    // 		layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

    // 	}
    // });

    // const [scrollPosition, setScrollPosition] = useState(0);

    // window.addEventListener('scroll', function () {
    //     setScrollPosition(window.scrollY);
    // });  
    //, backgroundPositionY: -scrollPosition background: "url(./background_image/OBDKVJ0.jpg", 
    //<div style={{ width: "100%", height: "5000px" }}></div>
    return (
        <div className="homepage" style={{}}>
            <Introduce></Introduce>
            <Solution></Solution>
            <Description></Description>
            <SSH></SSH>
            <Linux></Linux>
            <Techstack></Techstack>
            <AboutUs></AboutUs>
            <div className="home_background1" ></div>
            
        </div>
    );

}


function Introduce() {

    return (
        <div className="home_introduce">
            <Script title="KNOT" scripts="KNOT이란, KNOT is Not Only Ternimal 의 줄임말로 단순히 버튼으로 사용하는 ssh 가 아닌 터미널을 의미합니다."
                hname="직접 사용 해보기" styleType="intro_link"></Script>
            <Image source="./image/hello.gif"></Image>
        </div>
    );
}

function Solution() {
    return (
        <div className="home_solution">
            <Image source="./image/touch_file.gif"></Image>
            <Script title="Solution"
                scripts="우리의 목적은 더 쉽고 간단하게 사용할 수 있도록 UI기반의 터미널을 제공합니다."
                hname="자세히 알아보기..." styleType="default_link"></Script>
        </div>
    );
}

function Description() {
    return (
        <div className="home_description">
            <Script title="Description"
                scripts="KNOT Description script"
                hname="자세히 알아보기..." styleType="default_link"></Script>
            {/* <Image source=""></Image> */}
        </div>
    );
}

function Linux() {
    return (
        <div className="home_Linux">
            <Script title={`What is "Linux"?`} link="https://www.redhat.com/en/topics/linux/what-is-linux" hname="더 알아보기" styleType="default_link"
                scripts={`Linux® is an open source operating system (OS). It was originally conceived of and created as a hobby by Linus Torvalds in 1991. Linus, while at university, sought to create an alternative, free, open source version of the MINIX operating system, which was itself based on the principles and design of Unix. 
            That hobby has since become the OS with the largest user base, the most-used OS on publicly available internet servers, and the only OS used on the top 500 fastest supercomputers.`} />
            <Image source="./image/figure_of_linux.jpeg"></Image>
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
        <>
            <h1>Tech Stacks</h1>
            <div style={{ height: "200px", position: 'relative', overflow: "hidden" }}>
                {positions.map((position, index) => (
                    <img key={index} src={require(`./image/tech_stack/${src_dir[index]}.png`)} style={{ width: "200px", height: "200px", position: 'absolute', left: position }} />
                ))}
            </div>
        </>

    );
}

function AboutUs() {
    return (
        <div className="home_about_us">
            <Script title={`About Us`} link="" hname="About Us" styleType="default_link"
                scripts={`Description of About us`} />
            
        </div>

    );
}


function Script(props) {
    return (
        <div className="home_script">
            <h1>{props.title}</h1>
            <p>{props.scripts}</p>
            <a className={props.styleType} href={props.link} >{props.hname}</a>
        </div>
    );

}

function Image(props) {
    return (
        <div className="home_image">
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
