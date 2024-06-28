<template>
  <div class="home-container">
    <div class="content">
      <h1>欢迎来到我们的学习平台</h1>
      <p>
        我们的网站致力于提供高质量的编程和网页开发教程。无论您是初学者还是有经验的开发人员，都可以在这里找到有用的资源和指导。
      </p>
      <h2>我们的主题</h2>
      <div class="topics">
        <div class="topic">
          <h3>HTML</h3>
          <p>HTML（超文本标记语言）是构建网页的基础。学习HTML，您将了解如何使用标签和元素来创建网页内容。</p>
        </div>
        <div class="topic">
          <h3>CSS</h3>
          <p>CSS（层叠样式表）用于控制网页的外观和布局。通过学习CSS，您可以为网页添加样式和设计，使其更加美观和用户友好。</p>
        </div>
        <div class="topic">
          <h3>JavaScript</h3>
          <p>JavaScript 是一种强大的编程语言，用于创建动态和交互性网页。学习JavaScript，您可以为网页添加各种交互效果和功能。</p>
        </div>
        <!-- 可以根据需要添加更多主题 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home-container {
  height: 100vh;
  background: url('../assets/background_in_space.gif') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  padding: 20px;
}

.content {
  background: rgba(0, 0, 0, 0.7);
  padding: 20px;
  border-radius: 10px;
  max-width: 800px;
}

h1 {
  margin-bottom: 20px;
  font-size: 36px;
}

h2 {
  margin-top: 20px;
  font-size: 28px;
}

.topics {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.topic {
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  width: 200px;
  text-align: left;
}
</style>
