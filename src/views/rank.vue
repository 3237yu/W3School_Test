<template>
    <div class="board">
    <div class="box">
    <div class="leaderboard">
      <ul>
        <li v-for="(player, index) in leaderboard" :key="index">
          <span class="rank">{{ index + 1 }}</span>
          <span class="name">{{ player.name }}</span>
          <span class="score">分数: {{ player.score }}</span>
        </li>
      </ul>
    </div>
</div>
    <div class="des">
    <h1>排行榜规则说明</h1>
    <p>本榜单统计站内所有用户完成题目的总得分</p>
    <p>得分范围包括所有语言</p>
    <p>不同题目分数各不一样，且仅在第一次练习成功后为有效统计</p>
    <div class="ele">
    </div>
    </div>
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'Leaderboard',
    data() {
      return {
        leaderboard: [
          { name: '用户1', score: 2500 },
          { name: '用户2', score: 1800 },
          { name: '用户3', score: 1500 },
          { name: '用户4', score: 1200 },
          { name: '用户5', score: 1500 },
          // 可以添加更多玩家数据
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .board{
    background-image: url('../public/images/background_in_space.gif');
    display: flex;
    background-size: hover;
}
  
.box{
    margin: 20px;
    margin-left: 10%;
    margin-top: 0;
    width: 450px;
    height: 700px;
    background-image: url('../public/images/OIP.jpg');
    
}

  .leaderboard {
    margin: 20px;
    margin-left: 25%;
    padding-top: 50%;
    font-size: 25px;
  }
  .leaderboard ul {
    list-style: none;
    padding: 0;
  }
  .leaderboard li {
    margin: 10px 0;
  }
  .rank {
    font-weight: bold;
  }

  .des{
    float: right;
  text-align: center;
  font-size: 25px;
  margin-left: 30px;
  text-align: center; /* 文本居中 */
  border-radius: 8px;
  height: 300px;
  color: #fefefe;
  font-family:monospace;
  }

.ele{
    margin-top: 230px;
    margin-left: 250px;
    width: 400px;
    height: 200px;
    background-image: url('../public/images/lynx_landing.png'); /* PNG 图片的路径 */
  background-repeat: no-repeat; /* 背景图像不重复 */
  background-size: cover; /* 背景图像覆盖整个元素区域 */
  background-position: center; /* 背景图像居中显示 */
}
  .h1{
  font-size: 2em;
  line-height: 1.1;
}
  .name {
    margin-left: 10px;
  }
  .score {
    margin-left: 10px;
    color: #555;
  }


  </style>