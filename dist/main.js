var menubar = require('menubar')
const mb = menubar({
  preloadWindow:true,
dir:__dirname,
  width: 540,
  height: 425,
  icon: __dirname + '/cat.png',
  showDockIcon: false,
  tooltip :"农历",
  webPreferences:{devTools:true},
  show:true,
  // frame:false
  // showOnRightClick: true,

})
mb.on('ready', function ready () {
  console.log('app is ready')
  mb.showWindow()
})

const path = require('path')
const app = require('electron').app


let tray
let timeOut


const ipc = require('electron').ipcMain

ipc.on('asynchronous-message', function (event, arg, tray) {

    createIconByBase64(arg)

    tray = mb.tray

    clearTimeout(timeOut)
    timeOut = setTimeout(function(){

        tray = mb.tray

        // console.log(tray)

        tray.setImage(path.join(app.getPath("userData"), 'time.png'))

    },500)

    // event.sender.send('asynchronous-reply', 'pong')

})


function createIconByBase64(data){


    var fs = require('fs')

    // var data = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAWCAYAAABpGbbXAAAEwElEQVRoQ+2aV8isNRCGn2PvIojlSrFx7A0VvbGiqIjtWEBFsaLYbkRRbCB4IzYUK2IvHLGi2FAQxV6wi1hAsaPYFSuPTCCEb3ez+J/d348Ell2+bzKZTN5MZt7sHFprHuiRB+b0aC5tKs0DNEA3EPTKAzmgFx9jZr+NIdtEmwcm5oEE6KWB54H1KkfeAngxZHcFTgK+y/qm38t36HsCuLJinCWB34E/CtlVAfX67gPg7/+BrsWARQfY+VOF/U2k0gMJ0EsALwFnxnfqfgVwMfAO/JueuCi3AsdlgN4S2Bn4NTr5fSzwMfAAUEb+74Frgb+G2Lgp8DJwDHB1yDn+6cB5Wb9PgO2A92e5rnnA/A4b3wI2Av6sXK8mNsIDOaDfBPYB3gNWA1YAngYODJAvArwL3AhcCrwwQPdCwLMRtZ8ZcwUc8xzgxOh3PHB5/D4YuAnYG3gIMFL7bk1g42xDpSFnky5PsHWAywD9aFsYMHV7e0wfNfEhHigBvWcA5J6OPl8CaweIhgFaoH0agPt8TO+vD7gJdgOOiFNA0HqCPAdo19mZTuUfB+YC3xZjzSZdtwFPZZtzTLc08VoPlIA+IEslzKtfA/Jn6r0DuKCI0EadFHG2j5Ric+DnSFWSPaOKSXVok3mzackrAYIE6COLcbcB7s4AfUjYcQPgSTFbdDkXN54n3gbhDGuWr2oXqsnVeaAE9FHARZHXdWk4GtgEuD4DljpuB/YfMeT9kS7U5os5oLtUu4muA7aKlMPNYJFoKyP2NHVpz5OAhXTZdgEeqVuqJlXjgbIoNAJ+A1iVyx74MdLZ/P4QuAq4sIiU6wKyEsrfDNwZH0FntN0rFtTvYcVgbvMwEK4IPBg6zZ89SWybhZ2JgUn6pqkrnXTaZECQAVoqim1TvK50qWbtmkyHB8oIvQOwEnAusHIm/wXwKnBGsBwloJOoLIhyB8V3em6xeQKw4wwAWkblYcCcfttgYEYt7iBAT0qXBeoPBQW5CvBZbMpyA46aT3s/wAMJ0Dpcak52w4LskkghjKbyvbtnEfaWjgid1K8e0XIN4OtszP2C6vuvgPYEuSboO200R69pXYCelC6jsYVyyZmnzX9oVrfUzKXJDPFAAvSGwGOAQDSvOxkwWttMGQ4DdLyAHAbonaKIk2HIL0RmAtCmKxaA+wJ3DZiT4HFO5WVFCehJ6jKlkJrbOujMZLr8uZdM+ko+urUZ8EACtIA9PC4pZDW8PCnbvVHU+W5QynEqYM54VtHZXDFtkpqbPbt3sRxeQuwRuXqyXX2PRu4stbdMMAm/ZDZMU5cnnMFCdsNU7I047e6LYtpntXXFDCx5v1UICj86XK7UhV8OWLZj2t4AWjAqe1oUhcp54ZGYCy8Q7C+gPVIFmwt6CmAhJ4ds8Wik/WiEaweBsOxmLm0UtNiSffFmUpDkJ8Q0dcmP6ydvONOFkXOwTjk/Llf6jbIJzk4wm/fKXnjjlmiv0oQkk56n/3KsFcfm6/HixwBxuSHy56Y35uSJmZjgdKc+lH5xo8vHt/9wLIDlSMe2tJtF4aB0QPrNXE/qzqPcK/Da1GEBmN1UNg90e6D9H7oho1ceaIDu1XK2yTRANwz0ygMN0L1azjaZfwDZ7H0mpqjfxAAAAABJRU5ErkJggg=="

    var base64 = data.replace(/^data:image\/\w+;base64,/, "")
    var dataBuffer = new Buffer(base64, 'base64')
    // console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer))
    fs.writeFile(path.join(app.getPath("userData"), 'time.png'),dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err)
        }else{
           // console.log('写入成功！')
        }
    })
}