import { createContext, useReducer } from "react";

// context Objects are created with the convention of PascalCases instead of camelCases

export const PostList = createContext({                // Default values/ fallbacks for the context 
  postList: [],                                        // If a component tries to consume this context but there isn't a Provider supplying the real values, use these values instead
  addPost: () => {},                                   // Safe default for the data, safe placeholder functions for all cases
  deletePost: () => {},                                // Also remember : context does not hold the actual data -> they are just a reference to the actual states, or the reducers in this instance, that is where the values are stored
});

// Action Primarily remains empty, there is noting fixed, we decide what goes inside action object when we call dispatch 
const postListreducer = (postList, action) => {
  // this was an unnecessary way of doing things, two variables pointing to the same stupid array
  let newPostList = postList;
  switch (action.type) {
    case "delete":
      return newPostList.filter((post) => {
        return post.id != action.payload.id;
      });
    case "add":
      return [...newPostList, action.payload.currentPostList]
    default:
      return postList;
  }
};

const PostListProvider = ({ children }) => {
  //  dispatch is the function that you call when you want to update the state managed by useReducer
  //  useReducer manages the state
  //  reducer is the function that decides how that state should be changed
  const [postList, dispatchPostlist] = useReducer(
    postListreducer,
    DEFAULT_POST_LIST,
  );

  const addPost = (currentPostList) => {
    dispatchPostlist({type: "add", payload: {currentPostList}})
  };

// payload is the data that we are sending to the reducer along with the instruction
// entire object here is the action, would have been cool if this was called payload instead 
// payload for deletePost is just the payload: { id } 
  const deletePost = (id) => {
    dispatchPostlist({ type: "delete", payload: { id } });
  };

  return (
    <PostList.Provider value={{ postList, addPost, deletePost }}>
      {children}
    </PostList.Provider>
  );
};

const DEFAULT_POST_LIST = [
  {
    id: "2",
    title: "Learning React",
    body: "Finally understanding hooks and context API. Building my first project feels amazing!",
    reactions: 5,
    userId: "user-3",
    tags: ["react", "coding", "learning"],
  },
  {
    id: "3",
    title: "Weekend Trekking",
    body: "Climbed to the mountain peak yesterday. The sunrise view was absolutely breathtaking.",
    reactions: 8,
    userId: "user-7",
    tags: ["trekking", "nature", "adventure"],
  },
];

export default PostListProvider;
