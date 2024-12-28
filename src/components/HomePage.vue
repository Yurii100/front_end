<template>
  <div>
    <h1>Главная страница</h1>
    <div class="flex-container">
      <div v-for="article in articles" :key="article._id" class="article-preview">
        <img :src="article.img" alt="Титульное изображение" class="article-img">
        <h2>{{ article.title }}</h2>
        <p>{{ article.anons }}</p>
        <button @click="goToArticle(article._id)">Читать далее</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const articles = ref([]);
const router = useRouter();

const fetchArticles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/articles');
    articles.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении статей:', error);
  }
};

const goToArticle = (id) => {
  router.push({ name: 'newArticle', params: { id } });
};

onMounted(fetchArticles);
</script>

<style scoped>
.flex-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
h2, p, button {
  padding: 10px;
}
.article-preview {
  margin-top: 50px;
  margin-bottom: 20px;
  height: 400px;
  width: 500px;
  background-color: rgb(216, 208, 208);
}
.article-img { 
  width: 100%; 
  height: auto; 
}
button {
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-left: 10px;
}
</style>

  