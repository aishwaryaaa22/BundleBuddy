
import React, { useState } from "react";
import './Form.css'

function FullFormByState() {
  const [form, setForm] = useState({
    fullName: "",
    gender: "",
    state: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleDelete = () => {
    setForm({
      fullName: "",
      gender: "",
      state: "",
      email: "",
    });
  };

  return (
    <div
      style={{ color: "white", backgroundColor: "black" }}
      className="flex justify-center border-4"
    >
      
      <div className="bg-amber-50 nft h-auto w-150 rounded-2xl flex text-2xl p-5">
        <div>
          <label htmlFor="">Full Name: </label>
          <input className="border"
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
          />
          <p style={{ color: "grey" }}>Name: {form.fullName}</p>
          <br />
          <label>Gender: </label>
          <input
            type="radio"
            name="gender"
            checked={form.gender === "Male"}
            value="Male"
            onChange={handleChange}
          />{" "}
          Male&nbsp;
          <input
            type="radio"
            name="gender"
            checked={form.gender === "Female"}
            value="Female"
            onChange={handleChange}
          />{" "}
          Female &nbsp;
          <input
            type="radio"
            name="gender"
            checked={form.gender === "Other"}
            value="Other"
            onChange={handleChange}
          />{" "}
          Other
          <p style={{ color: "grey" }}>Gender: {form.gender}</p>
          <br />
          <label htmlFor="">Select State: </label>
          <select className="border"
            style={{ color: "white" }}
            name="state"
            value={form.state}
            onChange={handleChange}
          >
            <option className="text-grey"  value="">select </option>
            <option  className="text-black" value="Delhi">Delhi </option>
            <option  className="text-black" value="HR">HR </option>
            <option  className="text-black" value="PB">PB </option>
          </select>
          <p style={{ color: "grey" }}>State: {form.state}</p>
          <br />
          <label htmlFor="">Email</label>
          <input
          className="border"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          <p style={{ color: "grey" }}>Email: {form.email}</p>
          <br />
          <div className="flex gap-50 justify-between">
            <div ontouchstart="">
              <div className="button">
                <a href="#" onClick={handleDelete}>
                  Delete
                </a>
              </div>
            </div>

            <div ontouchstart="">
              <div className="button">
                <a href="#">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullFormByState;
