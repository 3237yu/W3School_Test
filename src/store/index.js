import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        topics: [],
        chapters: [],
        questions: []
    },
    mutations: {
        setTopics(state, topics) {
            state.topics = topics;
        },
        setChapters(state, chapters) {
            state.chapters = chapters;
        },
        setQuestions(state, questions) {
            state.questions = questions;
        }
    },
    actions: {
        async fetchTopics({ commit }) {
            const response = await axios.get('http://localhost:3000/topics');
            commit('setTopics', response.data);
        },
        async fetchChapters({ commit }, topicId) {
            const response = await axios.get(`http://localhost:3000/chapters?topicId=${topicId}`);
            commit('setChapters', response.data);
        },
        async fetchQuestions({ commit }, { topic, chapter }) {
            const response = await axios.get(`http://localhost:3000/questions?chapterId=${chapter}`);
            commit('setQuestions', response.data);
        }
    }
});
