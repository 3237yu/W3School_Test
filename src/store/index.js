import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
    state: {
        topics: [],
        chapters: [],
        questions: [],
        user: {
            username: '',
            avatar: '',
            isLoggedIn: false,
            isAdmin: false
        },
        statistics: {
            totalUsers: 0,
            totalQuestions: 0,
            totalVisits: 0
        }
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
        },
        setUser(state, user) {
            state.user.username = user.username;
            state.user.avatar = user.avatar;
            state.user.isLoggedIn = true;
            state.user.isAdmin = user.isAdmin; // 设置 isAdmin
        },
        logout(state) {
            state.user = {
                username: '',
                avatar: '',
                isLoggedIn: false
            };
        },
        SET_STATISTICS(state, statistics) {
            state.statistics = statistics;
            console.log(state.statistics, statistics)
        }
    },
    actions: {
        async fetchTopics({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/topics');
                commit('setTopics', response.data);
            } catch (error) {
                console.error('Error fetching topics:', error);
            }
        },
        async fetchChapters({ commit }, topicId) {
            try {
                const response = await axios.get(`http://localhost:3000/chapters?topicId=${topicId}`);
                commit('setChapters', response.data);
            } catch (error) {
                console.error('Error fetching chapters:', error);
            }
        },
        async fetchQuestions({ commit }, { topicId, chapterId }) {
            try {
                const response = await axios.get(`http://localhost:3000/questions?topicId=${topicId}&chapterId=${chapterId}`);
                commit('setQuestions', response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        },
        async login({ commit }, { username, password }) {
            try {
                const response = await axios.get(`http://localhost:3000/users?username=${username}&password=${password}`);
                if (response.data.length > 0) {
                    commit('setUser', response.data[0]);
                } else {
                    alert('登录失败，请检查您的用户名和密码');
                }
            } catch (error) {
                console.error('Error logging in:', error);
            }
        },
        logout({ commit }) {
            commit('logout');
        },
        async fetchStatistics({ commit }) {
            try {
                const response = await axios.get('http://localhost:3000/statistics');
                commit('SET_STATISTICS', response.data);
            } catch (error) {
                console.error('Error fetching statistics:', error);
            }
        }
    },
    modules: {}
});
