import { Form, Button, Input, Select, Space, Table, Tag } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import {
  addCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../store/actions/categoryActions";
import { Category, CategoryForm } from "../types/category";
import { Mode } from "../types/general";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const emptyForm: CategoryForm = {
  name: "",
  type: "expense",
  color: "black",
};
export default function Categories() {
  const [updateId, setUpdateId] = useState<null | number>(null);
  const [deleteId, setDeleteId] = useState<null | number>(null);
  console.log("updateId: ", updateId);
  console.log("deleteId: ", deleteId);
  const [mode, setMode] = useState<Mode>("new");
  const [form, setForm] = useState<CategoryForm>(emptyForm);
  console.log("form: ", form);
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(
    (state: AppState) => state.categories
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleOk = () => {
    //  setIsModalVisible(false);
    if (mode === "new") dispatch(addCategory(form));
    else if (mode === "edit" && typeof updateId === "number")
      dispatch(updateCategory(form, updateId));
    else if (mode === "delete") dispatch(deleteCategory(deleteId as number));
    console.log("setIsModalVisible i false yapmasi lazm burda!");
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setForm(emptyForm);
    setMode("new");
    setUpdateId(null);
    setDeleteId(null);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text: string, category: Category) => {
        return <Tag color={category.color}>{text.toUpperCase()}</Tag>;
      },
    },

    {
      title: "",
      key: "action",
      render: (text: string, category: Category) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#0390fc" }}
            onClick={() => {
              console.log("category: ", category);
              showModal("edit");
              setForm(category);
              setUpdateId(category.id);
            }}
          />
          <DeleteOutlined
            onClick={() => {
              console.log("category: ", category);
              showModal("delete");
              setDeleteId(category.id);
            }}
          />
        </Space>
      ),
    },
  ];
  useEffect(() => {
    console.log("Categories");
    dispatch(getCategories());
  }, []);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            showModal("new");
            setForm(emptyForm);
          }}
        >
          Add Category
        </Button>
      </div>
      <Modal
        title={
          mode === "edit"
            ? "Update Category Form"
            : mode === "new"
            ? "Add Category Form"
            : "Delete Category"
        }
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okButtonProps={{ disabled: mode !== "delete" && !form.name }}
      >
        {mode === "new" || mode === "edit" ? (
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
          >
            <Form.Item label="Category" required>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item label="Select">
              <Select
                defaultValue="income"
                onChange={(type: "expense" | "income") =>
                  setForm({
                    ...form,
                    type,
                  })
                }
              >
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Color">
              <SketchPicker
                color={form.color}
                onChange={(color) => setForm({ ...form, color: color.hex })}
              />
            </Form.Item>
          </Form>
        ) : (
          mode === "delete" && <h4>Are you sure?</h4>
        )}
      </Modal>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </React.Fragment>
  );
}
