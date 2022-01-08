class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        title: "Session",
        minutes: 25,
        seconds: 0,
        breakLength: 5,
        sessionLength: 25,
        displayTime: "25:00",
        playing: false,
        timer: "",
        color: "black"
      }
      
      this.reduceBreak = this.reduceBreak.bind(this);
      this.increaseBreak = this.increaseBreak.bind(this);
      this.reduceSession = this.reduceSession.bind(this);
      this.increaseSession = this.increaseSession.bind(this);
      this.resetSession = this.resetSession.bind(this);
      this.pausePlay = this.pausePlay.bind(this);
    }
    
    reduceBreak = () => {   // Decreases the break length by one.
      if (this.state.breakLength > 1) {
        if (this.state.title === "Break") {
          this.setState({
            breakLength: this.state.breakLength - 1,
            minutes: this.state.breakLength - 1,
            seconds: 0
          });
          if (this.state.breakLength-1 >= 10) {
            this.setState({
              displayTime: `${this.state.breakLength-1}:00`
            })
          } else {
            this.setState({
              displayTime: `0${this.state.breakLength-1}:00`
            })
          }
        }
        else {
          this.setState({
            breakLength: this.state.breakLength - 1
          });
        }
      }
    }
    
    increaseBreak = () => {   // Increases the break length by one.
      if (this.state.breakLength < 60) {
        if (this.state.title === "Break") {
          this.setState({
            breakLength: this.state.breakLength + 1,
            minutes: this.state.breakLength + 1,
            seconds: 0
          });
          if (this.state.breakLength+1 >= 10) {
            this.setState({
              displayTime: `${this.state.breakLength+1}:00`
            })
          } else {
            this.setState({
              displayTime: `0${this.state.breakLength+1}:00`
            })
          }
        }
        else {
          this.setState({
            breakLength: this.state.breakLength + 1
          });
        }
      }
    }
    
    reduceSession = () => {   // Decreases the session length by one.
      if (this.state.sessionLength > 1) {
        if (this.state.title === "Session") {
          this.setState({
            sessionLength: this.state.sessionLength - 1,
            minutes: this.state.sessionLength - 1,
            seconds: 0
          });
          if (this.state.sessionLength-1 >= 10) {
            this.setState({
              displayTime: `${this.state.sessionLength-1}:00`
            })
          } else {
            this.setState({
              displayTime: `0${this.state.sessionLength-1}:00`
            })
          }
        }
        else {
          this.setState({
            sessionLength: this.state.sessionLength - 1
          });
        }
      }
    }
    
    increaseSession = () => {   // Increases the session length by one.
      if (this.state.sessionLength < 60) {
        if (this.state.title === "Session") {
          this.setState({
            sessionLength: this.state.sessionLength + 1,
            minutes: this.state.sessionLength + 1,
            seconds: 0
          });
          if (this.state.sessionLength+1 >= 10) {
            this.setState({
              displayTime: `${this.state.sessionLength+1}:00`
            })
          } else {
            this.setState({
              displayTime: `0${this.state.sessionLength+1}:00`
            })
          }
        }
        else {
          this.setState({
            sessionLength: this.state.sessionLength + 1
          });
        }
      }
    }
    
    resetSession = () => {  // Resets both lengths to their original values.
      let breakIncrease = document.getElementById('break-increment');
      let breakDecrease = document.getElementById('break-decrement');
      let sessionIncrease = document.getElementById('session-increment');
      let sessionDerease = document.getElementById('session-decrement');
      
      if (this.state.playing === true) {
        let timer = this.state.timer;
        clearInterval(timer);
        
        this.setState({
          title: "Session"
        })
      }
      
      let audioFile = document.getElementById("beep");
      audioFile.pause();
      audioFile.currentTime = 0.0;
      audioFile.load();
      
      breakIncrease.disabled = false;
      breakDecrease.disabled = false;
      sessionIncrease.disabled = false;
      sessionDerease.disabled = false;
      this.setState({
        playing: false,
        minutes: 25,
        seconds: 0,
        breakLength: 5,
        sessionLength: 25,
        displayTime: "25:00",
        timer: "",
        color: "black"
      });
    }
    
    pausePlay = () => {   // This pauses and plays the display timer
      let breakIncrease = document.getElementById('break-increment');
      let breakDecrease = document.getElementById('break-decrement');
      let sessionIncrease = document.getElementById('session-increment');
      let sessionDerease = document.getElementById('session-decrement');
      
      this.setState({
        playing: !this.state.playing
      })
      
      var timerDisplay = setInterval(() => {
        
        if (this.state.playing === false) {
          breakIncrease.disabled = false;
          breakDecrease.disabled = false;
          sessionIncrease.disabled = false;
          sessionDerease.disabled = false;
  
          clearInterval(timerDisplay);
          
          this.setState({
            timer: ""
          })
        }
        
        if (this.state.playing === true) {
          breakIncrease.disabled = true;
          breakDecrease.disabled = true;
          sessionIncrease.disabled = true;
          sessionDerease.disabled = true;
          
          let minutes = this.state.minutes;
          let seconds = this.state.seconds;
          let timer = (minutes * 60) + seconds;
          
          if (timer < 61) {
            this.setState({
              color: "red"
            })
          } else {
            this.setState({
              color: "black"
            })
          }
  
          if (timer > 0) {
            timer--;
  
            minutes =  Math.floor(timer / 60);
            seconds = timer % 60;
  
            if (minutes >= 10) {
              if (seconds >= 10) {
                this.setState({
                  minutes: minutes,
                  seconds: seconds,
                  displayTime: `${minutes}:${seconds}`
                })
              } else {
                this.setState({
                  minutes: minutes,
                  seconds: seconds,
                  displayTime: `${minutes}:0${seconds}`
                })
              }
            } else {
              if (seconds >= 10) {
                this.setState({
                  minutes: minutes,
                  seconds: seconds,
                  displayTime: `0${minutes}:${seconds}`
                })
              } else {
                this.setState({
                  minutes: minutes,
                  seconds: seconds,
                  displayTime: `0${minutes}:0${seconds}`
                })
              }
            }
          }
          else if (timer === 0) {
            if (this.state.title === "Session") {
              this.setState({
                title: "Break",
                minutes: this.state.breakLength,
                seconds: 0
              })
              
              if (this.state.breakLength > 1) {
                this.setState({
                  color: "black"
                })
              } else {
                this.setState({
                  color: "red"
                })
              }
              
              if (this.state.breakLength >= 10) {
                this.setState({
                  displayTime: `${this.state.breakLength}:00`
                })
              } else {
                this.setState({
                  displayTime: `0${this.state.breakLength}:00`
                })
              }
              
            } else {
              this.setState({
                title: "Session",
                minutes: this.state.sessionLength,
                seconds: 0
              })
              
              if (this.state.sessionLength > 1) {
                this.setState({
                  color: "black"
                })
              } else {
                this.setState({
                  color: "red"
                })
              }
              
              if (this.state.sessionLength >= 10) {
                this.setState({
                  displayTime: `${this.state.sessionLength}:00`
                })
              } else {
                this.setState({
                  displayTime: `0${this.state.sessionLength}:00`
                })
              }
            }
            
            let audioFile = document.getElementById("beep");
            audioFile.play();
          }
        }
        
        this.setState({
          timer: timerDisplay
        })
      }, 1000);
    }
    
    render() {
      return (
        <div className='container'>
          <div className='topic'>
            <h2>25 + 5 Clock</h2>
          </div>
          
          <div className='duration'>
            <div className='length-duration'>
              <h4 id='break-label'>Break Length</h4>
              <div className='break-session'>
                <input type="image" src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/01_arrow_up-512.png" id="break-increment" className='arrow' onClick={this.increaseBreak}/>
                <p id='break-length'>{this.state.breakLength}</p>
                <input type="image" src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/01_arrow_down-512.png" id="break-decrement" className='arrow' onClick={this.reduceBreak}/>
              </div>
            </div>
            <div className='length-duration'>
              <h4 id='session-label'>Session Length</h4>
              <div className='break-session'>
                <input type="image" src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/01_arrow_up-512.png" id="session-increment" className='arrow' onClick={this.increaseSession}/>
                <p id='session-length'>{this.state.sessionLength}</p>
                <input type="image" src="https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color/700/01_arrow_down-512.png" id="session-decrement" className='arrow' onClick={this.reduceSession}/>
              </div>
            </div>
          </div>
          
          <div id='clock'>
            <div id='display'>
              <h4 id='timer-label' style={{color: this.state.color}}>{this.state.title}</h4>
              <h1 id='time-left' style={{color: this.state.color}}>{this.state.displayTime}</h1>
            </div>
            <div id='controls'>
              <input type="image" src="https://cdn4.iconfinder.com/data/icons/media-controls-4/100/play_pause-512.png" id="start_stop" className='ctr-btns' onClick={this.pausePlay}/>
              <input type="image" src="https://cdn1.iconfinder.com/data/icons/ui-line-minimal/512/Refresh_Line-512.png" id="reset" className='ctr-btns' onClick={this.resetSession}/>
              
            </div>
          </div>
          
          <div id='author'>
            <p style={{color: "red"}}>Designed and Coded by:</p>
            <p style={{color: "#800080"}}>Oche Okoh</p>
          </div>
          
          <audio id="beep" preload="auto" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      );
    }
  }
  
  ReactDOM.render(<Clock />, document.getElementById('app'));