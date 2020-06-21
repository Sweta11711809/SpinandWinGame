function game()
{
    var prize_config=
    {
        count:11,
        prize_names:["CB Book","3000 CB CREDIT","35% OFF","HARD LUCK","70% OFF","CB SWAGPACK","100% OFF","NETFLIX SUBSCRIPTION","50% OFF","AMAZON VOUCHER","2 Extra SPIN","CB TSHIRT"]
    };
    let config=
        {
            type:Phaser.AUTO,
            width:1320,
            height:650,
            scene:
            {
            preload : preload,
            create:create,
            },
        audio: 
          {
           disableWebAudio:true
          }
           
        };
    game=new Phaser.Game(config); 
    function preload()
    {
        this.load.image('background','back.jpg');
        this.load.image('pin','pin.png');
        this.load.image('wheel','FinalWheel1.png');
        this.load.image('button','spin-n-win-logo.png'); 
        this.load.audio('theme','yt_mp3spinwheel.mp3');
    }
    function create()
    {
        let W= game.config.width;
        let H= game.config.height;
        
        this.background=this.add.sprite(W/2,W/2,'background');
        
        this.button=this.add.sprite(170,120,"button");
        this.button.setScale(.20);
        this.button.inputEnabled=true;
        this.button.setInteractive({ cursor: 'pointer'});
        this.button.on("pointerdown",spinwheel,this);
        
        
      
        this.wheel=this.add.sprite(0,0,'wheel');
        this.wheel.setPosition((W/2)+230,H/2);
        this.wheel.setScale(.25);
        this.wheel.setDepth(1);
        
         
        let pin=this.add.sprite(0,0,'pin');
        pin.setPosition((W/2)+230,(H/2)-250);
        pin.setScale(.25);
        pin.setDepth(1);
          
        this.game_text=this.add.text(5,5,"Sweta Singh Welcome YOU ! Tap on the below button to spin the wheel",{
            font:"bold 30px Roboto",
            align:"center",
            color:"purple"
            
        });
        
        music = this.sound.add('theme');   
        canspin=true;
    }    
    function spinwheel()
    {
        if(canspin)
            {
        canspin=false;    
        let round=Phaser.Math.Between(2,4);
        console.log(round);
        let degree=Phaser.Math.Between(0,11)*30;
        
        let total_angel=round*360+degree;
        console.log(degree);
        music.play();
        
        let idx=prize_config.count-1-Math.floor(degree/(360/prize_config.count));
        tween = this.tweens.add({
            targets:this.wheel,
            angle:total_angel,
            ease:"Cubic.easeOut",
            duration :10000,
            callbackScope:this,
            scaleX:0.25,
            scaleY:0.25,
            onComplete:function()
            {
            if(prize_config.prize_names[idx+1]=="HARD LUCK")
                {
                    this.game_text.setText("OOPS You won HARD LUCK... Better Luck Next Time");
                }
                else if(prize_config.prize_names[idx+1]=="AMAZON VOUCHER")
                {
                    this.game_text.setText("Amazing You won AMAZON VOUCHER");
                }
                  else if(prize_config.prize_names[idx+1]=="100% OFF")
                {
                    this.game_text.setText("WOW ! 100% OFF");
                }
                else
                {
                  this.game_text.setText("Congratulation! You won "+prize_config.prize_names[idx+1]);
                }
            this.canspin=true;
            }
        }); 
            }
        
    }
    
    //--> Tweens are used to create animation in Phaser 
}