/**
 *  播放器: 
 *  1 要传给它一个相对于调用者所在窗口的(x,y,w,h)。矩形
 *  2 要传给播放大一个对应的URL
 *  3 开始播放出来
 *  4 停止播放
 *  5 结束, 关闭播放器
 * 
 * 1 TXLivePlayerCh__config()
 * 配置播放器，也是初始化播放器, 这是第一步
 * 
 * 2 TXLivePlayerCh__playWithUrl()
 * 开始播放
 * 
 * 3 TXLivePlayerCh__stopPlay()
 * 停止播放
 * 
 * 4 TXLivePlayerCh__display_normal()
 * 根据提前设置好的参数，显示直播画面
 * 
 * 5 TXLivePlayerCh__display_fullscreen()
 * 全屏显示直播界面
 * 
 * 6 TXLivePlayerCh__closePlayer()
 * 关闭播放器
 * 
 */

function player_cb(v) {
  console.log(JSON.stringify(v));
}

function TXLivePlayerCh__config() {

  let u = 'https://license.vod2.myqcloud.com/license/v2/1300851885_1/v_cube.license';
  let k = '8088582a20521722e030bf97174f3990';
  pageparams.model_TXLivePlayerCh.setLicence({
    licenceURL: u,
    licenceKey: k
  });

  pageparams.model_TXLivePlayerCh.configPlayerView({
    rect: pageparams.player_rect_small,
    fixedOn: pageparams.frame_name,
    fixed: true,
    enableAEC: true,
  });
  pageparams.model_TXLivePlayerCh.initPlayer();
  pageparams.model_TXLivePlayerCh.enableHWAcceleration({ HWAcceleration: true });
  pageparams.model_TXLivePlayerCh.setPlayConfig({
    enableAEC: true,
    connectRetryCount: 3,
    connectRetryInterval: 3,
    cacheTime: 2,
  });

  pageparams.model_TXLivePlayerCh.addEventListener(
    function (ret) {
      console.log('播放器回调事件: ' + JSON.stringify(ret));
      if (ret.evtID == 8003) {
        console.log('请求视频位成功...');
        player_cb(ret.evtID);
      } else if (ret.evtID == 2004) {
        console.log('视频播放已开始...');
        player_cb(ret.evtID);
      } else if (ret.evtID == -2301) {
        console.log('异常,从此不再连接');
        player_cb(ret.evtID);
      } else if (ret.evtID == 2103) {
        console.log('远程服务器断开了');
        player_cb(ret.evtID);
      } else {
        console.log(':PLAYER事件: ');
        player_cb(ret.evtID);
      }
    }
  );
}

function TXLivePlayerCh__playWithUrl() {
  if (pageparams.url == '') {
    alert("检查服务器");
    return;
  }
  pageparams.model_TXLivePlayerCh.playWithUrl({
    type: 'flv',
    videoURL: pageparams.url,
  });
}

function TXLivePlayerCh__stopPlay() {
  pageparams.model_TXLivePlayerCh.stopPlay();
}

function TXLivePlayerCh__closePlayer() {
  TXLivePlayerCh__stopPlay();
  pageparams.model_TXLivePlayerCh.closePlayer();
}


function TXLivePlayerCh__display_normal() {
  pageparams.model_TXLivePlayerCh.resizePlayerView({
    rect: pageparams.player_rect_small,
  });
  pageparams.model_TXLivePlayerCh.setRenderMode({
    mode: 'edge',
  });
  setTimeout(() => {
    pageparams.model_TXLivePlayerCh.setRenderRotation({
      orientation: 'right'
    });
    pageparams.player_is_fullscreen = false;
  }, 20);
}


function TXLivePlayerCh__display_fullscreen() {
  console.log("TXLivePlayerCh__setRenderMode_edge");
  pageparams.model_TXLivePlayerCh.resizePlayerView({
    rect: pageparams.player_rect_fullscreen,
  });
  pageparams.model_TXLivePlayerCh.setRenderMode({
    mode: 'edge',
  });

  setTimeout(() => {
    pageparams.model_TXLivePlayerCh.setRenderRotation({
      orientation: 'down'
    });
    pageparams.player_is_fullscreen = true;
  }, 1000);
}