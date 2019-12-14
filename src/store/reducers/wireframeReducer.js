const initState = {
    wireframes: []
};

const wireframeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CREATE_TODO_LIST':
            console.log("Create new wireframe");
            return state;
        case 'CREATE_TODO_LIST_ERROR':
            console.log("Create new wireframe ERROR");
            return state;
        /* IF YOU HAVE ANY TODO LIST EDITING REDUCERS ADD THEM HERE */
        default:
            return state;
    }
};

export default wireframeReducer;