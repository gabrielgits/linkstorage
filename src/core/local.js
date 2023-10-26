import CONSTANTS from "./constants";
const { v4: uuidv4 } = require('uuid');

export function loadData(){
    try {
        const localLinks = localStorage.getItem(CONSTANTS.key_links);
        const localCategories = localStorage.getItem(CONSTANTS.key_categories);
        if (localCategories === null || localLinks === null){
            return false;
        }
        const categories = JSON.parse(localCategories);
        const links = JSON.parse(localLinks);
        return {links, categories};
    } catch (error) {
        alert('Error to loading data:', error);
    }
}

export function login(email, password){
    try {
        const localUser = localStorage.getItem(CONSTANTS.key_user);
        if (localUser === null){
            return false;
        }
        const user = JSON.parse(localUser);
        if (user.email !== email && user.password !== password){
            return false;
        }
        localStorage.setItem(CONSTANTS.key_session,user);
        return true;
    } catch (error){
        console.log(error.message);
        return {sucess:false};
    }
}

export function signup(email, password){
    try {
        const user = {email, password, id:uuidv4()};
        const categories = [];
        const links = [];
        
        const userLocal = JSON.stringify(user);
        const categoriesLocal = JSON.stringify(categories);
        const linksLocal = JSON.stringify(links);
        
        localStorage.clear();
        localStorage.setItem(CONSTANTS.key_user, userLocal);
        localStorage.setItem(CONSTANTS.key_session, userLocal);
        localStorage.setItem(CONSTANTS.key_categories, categoriesLocal);
        localStorage.setItem(CONSTANTS.key_links, linksLocal);
        
        return true;
    } catch (error) {
        alert('Error to signup:', error);
    }
}

export function getCategories(){
    try {
        const localCategories = localStorage.getItem(CONSTANTS.key_categories);
        if (localCategories === null){
            return [];
        }
        return JSON.parse(localCategories);
    } catch (error) {
        alert('Error to get categories:', error);
    }
}

export function addCategory(categories,category){
    try {
        const newCategories = [...categories, category];
        const localCategories = JSON.stringify(newCategories);
        localStorage.setItem(CONSTANTS.key_categories, localCategories);
        return category;
    } catch (error) {
        alert('Error to add category:', error);
    }
}

export function addCategorySimple(category){
    try {
        let localCategories = localStorage.getItem(CONSTANTS.key_categories);
        if (localCategories === null){
            const newCategories = [category];
            const localCategories = JSON.stringify(newCategories);
            localStorage.setItem(CONSTANTS.key_categories, localCategories);
            return {categories:newCategories, category:category};
        }
        const categories = JSON.parse(localCategories);
        categories.push(category);
        localCategories = JSON.stringify(categories);
        localStorage.setItem(CONSTANTS.key_categories, localCategories);
        return {categories, category};
    } catch (error) {
        alert('Error to add category:', error);
    }
}

export function saveLink(link){
    try {
        let localLinks = localStorage.getItem(CONSTANTS.key_links);
        const newLink = ({...link, id:uuidv4()});
        if (localLinks === null){
            const newLinks = [newLink];
            const localLinks = JSON.stringify(newLinks);
            localStorage.setItem(CONSTANTS.key_links, localLinks);
            return true;
        }
        const links = JSON.parse(localLinks);
        links.push(newLink);
        localLinks = JSON.stringify(links);
        localStorage.setItem(CONSTANTS.key_links, localLinks);
        return true;
    } catch (error) {
        alert('Error to save link:', error);
    }
}
    
export function deleteLink(link){
    try {
        let localLinks = localStorage.getItem(CONSTANTS.key_links);
        if (localLinks === null){
            return false;
        }
        const links = JSON.parse(localLinks);
        const newLinks = links.filter((l) => l.id !== link.id);
        localLinks = JSON.stringify(newLinks);
        localStorage.setItem(CONSTANTS.key_links, localLinks);
        return true;
    } catch (error) {
        alert('Error to delete link:', error);
    }
}

export function deleteCategory(category){
    try {
        let localCategories = localStorage.getItem(CONSTANTS.key_categories);
        if (localCategories === null){
            return false;
        }
        const categories = JSON.parse(localCategories);
        const newCategories = categories.filter((c) => c !== category);
        localCategories = JSON.stringify(newCategories);
        localStorage.setItem(CONSTANTS.key_categories, localCategories);
        return true;
    } catch (error) {
        alert('Error to delete category:', error);
    }
}
