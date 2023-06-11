const socket = io.connect('http://tuxserver.cbnu.ac.kr:10021');


function handleKeyPress(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        const command = document.getElementById('command').value;

        socket.emit('ssh-command', command);

        document.getElementById('command').value = '';
    }
}


document.getElementById('connect').onclick = () => {
    const host = document.getElementById('host').value;
    const port = document.getElementById('port').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    socket.emit('ssh-connect', {host, port, username, password}); 
    
    getPositionByIPAddress(host);
};

document.getElementById('send').onclick = () => {
    const command = document.getElementById('command').value;

    socket.emit('ssh-command', command);
    document.getElementById('command').value = '';
};

document.getElementById('ls').onclick = () => {
    socket.emit('ssh-command', "ls");
}

document.getElementById('lsp').onclick = () => {
    socket.emit('ssh-command', "ls ../");
}

document.getElementById('lsr').onclick = () => {
    socket.emit('ssh-command', "ls /");
}

document.getElementById('lsa').onclick = () => {
    socket.emit('ssh-command', "ls -al");
}

document.getElementById('cd').onclick = () => {
    document.getElementById('command').value = 'cd [이동할 디렉터리로 수정]';
}

document.getElementById('cdr').onclick = () => {
    socket.emit('ssh-command', "cd /");
}

document.getElementById('cdh').onclick = () => {
    socket.emit('ssh-command', "cd");
}

document.getElementById('cdp').onclick = () => {
    socket.emit('ssh-command', "cd ..");
}

document.getElementById('mv').onclick = () => {
    document.getElementById('command').value = 'mv [원본 파일 이름] [바꿀 파일 이름]';
}

document.getElementById('mvf').onclick = () => {
    document.getElementById('command').value = 'mv [파일 이름] [디렉터리 이름]';
}

document.getElementById('mva').onclick = () => {
    document.getElementById('command').value = 'mv [파일 이름] [파일 이름] [디렉터리 이름]';
}


socket.on('ssh-ready', () => {
    document.getElementById('console').value += 'SSH Connection Ready\n';
});

socket.on('ssh-data', (data) => {
    document.getElementById('console').value += data;
    document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
});

socket.on('ssh-error', (error) => {
    document.getElementById('console').value += 'Error: ' + error + '\n';
});

socket.on('ssh-end', () => {
    document.getElementById('console').value += 'SSH Connection Closed\n';
});

function getPositionByIPAddress(ipAddress) {
    const apiKey = "f45aa13450af33ca973542a336099aa8";
    const url ="http://api.ipstack.com/"+ipAddress+"?access_key=f45aa13450af33ca973542a336099aa8" 
    $.ajax({
      method: "GET",
      url: url,
      dataType: 'json',
      
      success: function (response) {
        const coordinates = {
          x: response.longitude,
          y: response.latitude,
          
        }
        
        console.log(`위도: ${coordinates.y}, 경도: ${coordinates.x}`);
        initMap2(coordinates.y, coordinates.x);
      },
      error: function (xhr, status, error)
      {
          $('body').css('cursor', 'default');    //커서 정상모양

          alert(error + "\n" + status + "\n" + xhr.responseText);
      }
    });
  }