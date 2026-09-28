import { createContext, useReducer } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

// Action Primarily remains empty, there is noting fixed, we decide what goes inside action object when we call dispatch 
const postListreducer = (postList, action) => {
  // this was an unnecessary way of doing things
  let newPostList = postList;
  switch (action.type) {
    case "delete":
      return newPostList.filter((post) => {
        return post.id != action.payload.id;
      });
    case "add":
      return [action.payload.currentPostList,...newPostList]
    default:
      return postList;
  }
};

const PostListProvider = ({ children }) => {

  const [postList, dispatchPostlist] = useReducer(
    postListreducer,
    DEFAULT_POST_LIST,
  );

  const addPost = (currentPostList) => {
    dispatchPostlist({type: "add", payload: {currentPostList}})
  };

// payload is the data that we are sending to the reducer along with the instruction
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
