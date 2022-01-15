import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select, Space, Table, Tag } from "antd";

import Modal from "antd/lib/modal/Modal";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { getCategories } from "../store/actions/categoryActions";
import { addRecord, deleteRecord, getRecords, updateRecord } from "../store/actions/recordActions";
import { Category } from "../types/category";
import { Mode } from "../types/general";
import { Record, RecordForm } from "../types/record";

const emptyForm: RecordForm = {
  title: "",
  amount: 0,
  category_id: 0,
};
type Id = number | null;
const initalUpdateId: Id = null;
function Records() {
  const [updateId, setUpdateId] = useState<Id>(initalUpdateId);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<RecordForm>(emptyForm);
  console.log("formRecord: ", form);
  const [mode, setMode] = useState<Mode>("new");
  const { data, loading, error } = useSelector(
    (state: AppState) => state.records
  );
  const { data: categories } = useSelector(
    (state: AppState) => state.categories
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log("records: ", data);

  const dispatch = useDispatch();

  const showModal = (mode: Mode) => {
    setIsModalVisible(true);
    setMode(mode);
  };

  const handleOk = () => {
   if(mode==="new") dispatch(addRecord(form));
   else if(mode==="edit" && typeof updateId === "number")dispatch(updateRecord(form,updateId))
   else if(mode==="delete"&& typeof deleteId === "number" )dispatch(deleteRecord(deleteId));
    setIsModalVisible(false);
    setMode("new");
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setMode("new"); //bizim default degerimiz new idi o yuzden model i kapatirken, default degerlerine dondurerek kapaiyoruz
    setForm(emptyForm);
    setUpdateId(null);
    setDeleteId(null);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: Record["amount"], record: Record) => {
        return (
          <>
            {" "}
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(amount)}{" "}
          </>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: Category, record: Record) => {
        return <Tag color={category.color}>{category.name.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Last Update",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt: string, record: Record) => {
        const updatedDate = new Date(updatedAt);
        return (
          <>
            {updatedDate.toLocaleDateString()}{" "}
            {updatedDate.toLocaleTimeString("no-No", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
          </>
        );
      },
    },
    {
      title: "",
      key: "action",
      render: (text: string, record: Record) => {
        const { title, amount } = record;
        const category_id = record.category.id;
        return (
          <Space size="middle">
            <EditOutlined style={{ color: "#0390fc" }} onClick={(e) => {
                showModal("edit");
                setForm({
                    title,
                    amount,
                    category_id
                })
                setUpdateId(record.id);
            }} />
            <DeleteOutlined onClick={() => {
                  showModal("delete");

                  setDeleteId(record.id)
            }} style={{ color: "#c20808" }} />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getRecords());
    categories.length === 0 && dispatch(getCategories());
  }, []);

  const isFormValid = !(
    !form.title ||
    form.amount === 0 ||
    form.category_id === 0
  );
  console.log("categories: ", categories);
  return (
    <React.Fragment>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "10px",
          }}
        >
          <Button type="primary" onClick={() => showModal("new")}>
            New Record
          </Button>
        </div>
        <Modal
          title={
            mode === "new"
              ? "Create New Record"
              : mode === "edit"
              ? "Update Record"
              : "Delete Record"
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{ disabled: mode !== "delete" && !isFormValid }}
        >
          {mode === "new" || mode === "edit" ? (
            <Form name="basic" labelCol={{ span: 8 }}>
              <Form.Item label="Title">
                <Input
                  name="title"
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                />
              </Form.Item>
              <Form.Item label="Amount">
                <Input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={(event) =>
                    setForm({ ...form, amount: Number(event.target.value) })
                  }
                />
              </Form.Item>
              <Form.Item label="Category">
                {
                  //onChange ile secilen degeri state timize atama controlled fom islemi ant design dan gelen ozellkten dolayi direk parametreye gelen deger oraya girdgimiz deger oluyor yoksa normal de oy le degil.
                }
                <Select
                  defaultValue={form.category_id}
                  value={form.category_id}
                  onChange={(category_id) => setForm({ ...form, category_id })}
                >
                  <Select.Option value={0} disabled>
                    Select a category
                  </Select.Option>
                  {categories.map((category) => {
                    return (
                      <Select.Option value={category.id} key={category.id}>
                        {category.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Form>
          ) : (
            mode === "delete" && <h4>Are you sure?</h4>
          )}
        </Modal>
      </div>
      <Table  loading={loading} columns={columns} dataSource={data} rowKey="id" />
    </React.Fragment>
  );
}

export default Records;
