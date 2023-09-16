"use client";

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import BlogDetails from "./BlogDetails";
import clientPromise from "../../mongo";
import EditModal from "../../components/EditModal";
import DeleteModal from "../../components/DeleteModal";
// import { editBlog } from "../../api";

import Modal from "react-modal";

// const blogList = [
//   {
//     title: "First Blog",
//     desc: "This is my first blogasdasdasdasdasada",
//     id: "first_blog",
//   },
//   { title: "Second Blog", desc: "This is my first blog", id: "second_blog" },
//   { title: "Third Blog", desc: "This is my first blog", id: "third_blog" },
//   { title: "Four Blog", desc: "This is my first blog", id: "fourth_blog" },
//   { title: "Five Blog", desc: "This is my first blog", id: "five_blog" },
//   { title: "Five Blog", desc: "This is my first blog", id: "five_blog" },
// ];

const Dashboard = ({ blogList }) => {
  const [selectedBlogDetails, setBlogDetails] = useState({});

  const [blogListState, setBlogListState] = useState([]);

  useEffect(() => {
    setBlogListState(blogList);
  }, [blogList]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeletModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedBlog, setSelectedBlog] = useState();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const onEditModalChange = (value) => {
    setShowEditModal((state) => !state);
    if (value) {
      setSelectedBlog(value);
    } else {
      setSelectedBlog(null);
    }
  };

  const onDeleteModalChange = (value) => {
    setShowDeletModal((state) => !state);
    if (value) {
      setSelectedBlog(value);
    } else {
      setSelectedBlog(null);
    }
  };

  const router = useRouter();

  const onBlogDetails = (value) => {
    router.push("/" + value);
  };

  const updateBlogList = async () => {
    let res = await fetch("/api/blog", {
      method: "GET",
    });
    res = await res.json();
    console.debug("await", res);
    setBlogListState(res);
  };

  const saveModalDetails = async (title, desc, id) => {
    setShowEditModal(false);
    let res = await fetch("/api/blog", {
      method: "PUT",
      body: JSON.stringify({
        title: title,
        desc: desc,
        id: id,
      }),
    });
    res = await res.json();
    await updateBlogList();
    await setSelectedBlog();
  };

  const onBlogDelete = async (id) => {
    setShowDeletModal(false);
    let res = await fetch("/api/blog", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
    });
  };

  const onAddModalChange = () => {
    setShowAddModal((state) => !state);
  };

  const saveNewModalDetails = async (title, desc) => {
    onAddModalChange();
    let res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        desc: desc,
        id: title,
      }),
    });
    await updateBlogList();
    setSelectedBlog();
  };
  return (
    <>
      <div className="p-4">
        <div className="flex justify-center space-y-2 p-4 flex-col items-center">
          <h3 className="text-4xl font-bold px-2 ">Blog Dashboard</h3>
          <p className="text-gray-500">
            This is the list of Blog from my mongoDB Atlas
          </p>
        </div>
        <div className="flex justify-end text-blue-500 ">
          <div
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => onAddModalChange()}
          >
            + Add New Blog
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {blogListState.map((item) => {
            return (
              <div>
                <BlogCard
                  key={item.id}
                  item={item}
                  onReadMore={onBlogDetails}
                  onEditModalChange={onEditModalChange}
                  onDeleteModalChange={onDeleteModalChange}
                />
              </div>
            );
          })}
        </div>
        <Modal
          isOpen={showEditModal}
          onRequestClose={onEditModalChange}
          style={customStyles}
        >
          <EditModal
            onEditModalChange={onEditModalChange}
            item={selectedBlog}
            saveModalDetails={saveModalDetails}
            edit={true}
          />
        </Modal>

        <Modal
          isOpen={showAddModal}
          onRequestClose={onAddModalChange}
          style={customStyles}
        >
          <EditModal
            onEditModalChange={onAddModalChange}
            item={selectedBlog}
            saveModalDetails={saveNewModalDetails}
            edit={false}
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onRequestClose={onDeleteModalChange}
          style={customStyles}
        >
          <DeleteModal
            onDeletModalChange={onDeleteModalChange}
            item={selectedBlog}
            onBlogDelete={onBlogDelete}
          />
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(ctx) {
  let { DEV_URL } = process.env;
  let response = await fetch(`${DEV_URL}/api/blog`);
  let blogList = await response.json();

  return {
    props: { blogList },
  };
}
