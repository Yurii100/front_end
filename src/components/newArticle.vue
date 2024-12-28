<template>
  <div class="article">
    <button @click="goToHomePage">Назад ко сем статьям</button>
    <img :src="article.img" alt="Титульное изображение" class="article-img">
    <h1>{{ article.title }}</h1>
    <p>{{ article.anons }}</p>
    <div v-html="article.full_text"></div>
  </div>
  <div class="Commnets">
    <div>
      <h2>Оставьте комментарии</h2>
      <form @submit.prevent="editingItem ? saveItem() : addItem()">
        <input class="text-area-1" type="text" v-model="name" placeholder="Введите имя"/><br>
        <input class="text-area-2" type="text" v-model="message" placeholder="Введите сообщение"/><br><br>
        <button type="submit">{{ editingItem ? "Изменить элемент" : "Добавить" }}</button>
        <button v-if="editingItem" type="button" @click="cancelEdit">Отмена</button>
      </form>
    </div>
    <div>
      <h2>Комментарии</h2>
      <div class="list-item" v-for="(el, i) in comments" :key="el._id">
        <p>
          {{ el.message }} <span>{{ el.name }}</span>
        </p>
        <p>
          {{ new Date(el.published).toLocaleString() }} 
          <button @click="deleteItem(el, i)">Удалить</button>
          <button @click="editItem(el)">Изменить</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const article = ref({});
const comments = ref([]);
let message = ref("");
let name = ref("");
let editingItem = ref(null);
const route = useRoute();
const router = useRouter();

const fetchArticle = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/articles/${route.params.id}`);
    article.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении статьи:', error);
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/comments/${route.params.id}`);
    comments.value = response.data;
  } catch (error) {
    console.error('Ошибка при получении статьи:', error);
  }
};

const deleteItem = async (el, i) => {
  await axios.delete(`http://localhost:3000/api/comments/${el._id}`);
  comments.value.splice(i, 1);
};

const addItem = async () => {
  try {
    const url = "http://localhost:3000/api/comments";
    const response = await axios.post(url, { 
      message: message.value, 
      name: name.value, 
      published: new Date().toISOString(),
      articleId: route.params.id 
    });
    comments.value.push(response.data);
    this.items.push(response.data);
    message.value = "";
    name.value = "";
  } catch (error) {
    console.error('Ошибка при добавлении комментария:', error);
  }
};

const editItem = (el) => {
  editingItem.value = el;
  message.value = el.message;
  name.value = el.name;
};

const saveItem = async () => {
  try {
    const url = `http://localhost:3000/api/comments/${editingItem.value._id}`; 
    const response = await axios.put(url, { 
      message: message.value, 
      name: name.value, 
      published: editingItem.value.published,
      articleId: editingItem.value.articleId 
    }); 
    console.log('Ответ от сервера при редактировании:', response.data); 
    const index = comments.value.findIndex(item => item._id === editingItem.value._id); 
    if (index !== -1) { 
      comments.value[index].message = message.value; 
      comments.value[index].name = name.value; 
    }
    cancelEdit();
  } catch (err) {
    console.error('Ошибка при редактировании элемента:', err);
  }
};

const cancelEdit = () => {
  editingItem.value = null; 
  message.value = "";
  name.value = "";
};

onMounted(() => {
  fetchArticle();
  fetchComments();
});


const goToHomePage = () => {
  router.push({ name: 'Home'});
};
</script>

<style scoped>
.article {
  width: 800px;
  margin-left: 500px;
}
button {
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 10px;
}
.list-item {
  width: 100%;
  background: #dfbc4c;
  padding: 10px 15px;
  margin-top: 20px;
  border-radius: 5px;
  font-size: 14px;
}
.list-item p {
  margin-bottom: 5px;
}
.list-item p span {
  color: #8f772d;
  font-size: 12px;
}
.list-item p button {
  float: right;
  font-size: 9px;
  margin: 0;
  padding: 5px 6px;
}
.list-item p:last-child {
  color: #b1953c;
  font-size: 11px;
}
.Commnets {
  margin-top: 30px;
  margin-left: 500px;
}
.text-area-2 {
  margin-top: 10px;
  height: 60px;
  width: 700px;
}
.text-area-1 {
  margin-top: 10px;
  height: 40px;
  width: 700px;
}
</style>
