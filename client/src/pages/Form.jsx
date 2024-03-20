import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import logo from "../Img/laoji.jpeg";

function FormComponent() {
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const apiKey = "AIzaSyAM3iuCz-gy_ZCKscaWWhlsaQ5WUabyy2w";

  const getUserGeolocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  };

  const onFinish = async (values) => {
    console.log("Received values:", apiKey);

    try {
      const { latitude, longitude } = await getUserGeolocation();

      const geocodingResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );
      const geocodingData = await geocodingResponse.json();
      const cityName = geocodingData.results[0].address_components.find(
        (component) => component.types.includes("locality")
      ).long_name;

      const dataToSend = {
        ...values,
        googlemaps: cityName,
      };

      const response = await fetch("/api/forms/formsubmit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="login" style={{ maxWidth: 400, margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "Center" }}>
        {" "}
        <img
          src={logo}
          alt="Logo"
          style={{ width: "200px", marginBottom: "20px" }}
        />{" "}
      </div>
      {!submitted ? (
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>
                සේවාදායකයාගේ නම
              </span>
            }
            name="name"
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>
                පදිංචි ප්‍රදේශය?
              </span>
            }
            name="place"
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>
                ඔබ භාවිතා කරන තේ කොළ වර්ගය කුමක්ද?
              </span>
            }
            name="brand"
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <span style={{ fontWeight: "bold", color: "gold" }}>
                ඔබ දිනකට පානය කරන තේ කෝප්ප ගණන කීයද?
              </span>
            }
            name="cups"
            rules={[{ required: true, message: "" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "gold",
                borderColor: "gold",
                color: "red",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Thank you for your submission!</h2>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "gold",
              borderColor: "gold",
              color: "red",
            }}
            onClick={handleRefresh}
          >
            <b>OK</b>
          </Button>
        </div>
      )}
    </div>
  );
}

export default FormComponent;
