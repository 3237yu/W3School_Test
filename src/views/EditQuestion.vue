<template>
    <div class="edit-question">
        <h2>Edit Question</h2>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="question-text">Question Text</label>
                <textarea id="question-text" v-model="editedQuestion.text" required></textarea>
            </div>
            <div v-if="editedQuestion.type === 'multiple-choice'">
                <label for="options">Options</label>
                <ul>
                    <li v-for="(option, index) in editedQuestion.options" :key="index">
                        <input type="text" v-model="editedQuestion.options[index]" required>
                    </li>
                </ul>
            </div>
            <div v-if="editedQuestion.type === 'true-false' || editedQuestion.type === 'short-answer'">
                <label for="correct-answer">Correct Answer</label>
                <input type="text" id="correct-answer" v-model="editedQuestion.correctAnswer" required>
            </div>
            <button type="submit">Save Changes</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'EditQuestion',
    props: {
        questionId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            editedQuestion: {
                id: null,
                text: '',
                type: '', // 题目类型
                options: [], // 如果是选择题，选项
                correctAnswer: '' // 正确答案
            }
        };
    },
    async mounted() {
        // 根据题目 ID 获取题目信息，并填充到 editedQuestion 对象中
        await this.fetchQuestion();
    },
    methods: {
        async fetchQuestion() {
            try {
                const response = await axios.get(`http://localhost:3000/questions/${this.questionId}`);
                this.editedQuestion = response.data;
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        },
        async handleSubmit() {
            try {
                const response = await axios.put(`http://localhost:3000/questions/${this.questionId}`, this.editedQuestion);
                console.log('Question updated successfully:', response.data);
                // 更新成功后跳转回题目管理页面或其他适当的页面
                this.$router.push('/admin');
            } catch (error) {
                console.error('Error updating question:', error);
            }
        }
    }
};
</script>

<style scoped>
/* 样式可以根据需求自行调整 */
.edit-question {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

label {
    display: block;
    margin-bottom: 5px;
}

textarea, input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
