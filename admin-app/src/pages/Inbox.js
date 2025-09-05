import React, { useState } from "react";
import Meta from "../components/Meta";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Inbox = () => {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "John Doe",
      subject: "Meeting Reminder",
      time: "10:30 AM",
    },
    {
      id: 2,
      sender: "Jane Smith",
      subject: "Project Update",
      time: "09:15 AM",
    },
    {
      id: 3,
      sender: "John Doe",
      subject: "Meeting Reminder",
      time: "10:30 AM",
    },
    {
      id: 4,
      sender: "Jane Smith",
      subject: "Project Update",
      time: "09:15 AM",
    },
  ]);

  return (
    <>
      <Meta title={t("inbox")} />

      <div className="container py-2">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3>{t("inbox")}</h3>
          <Link to="mailto:?subject=New Message" className="button">
            {t("compose")}
          </Link>
        </div>

        {messages.length > 0 ? (
          <div className="list-group mb-5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mt-1"
              >
                <div>
                  <strong>{msg.sender}</strong>
                  <p className="mb-0 text-muted">{msg.subject}</p>
                </div>
                <span className="text-muted small">{msg.time}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="d-flex align-items-center justify-content-center">
            <div className="p-3 shadow bg-light rounded-3 text-center">
              <i className="fas fa-envelope fs-3 text-muted"></i>
              <h5 className="mt-3">{t("no_messages")}</h5>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Inbox;
