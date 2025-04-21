import React, { useState, useEffect } from "react";
import axios from "axios";

const DepartmentPage = () => {
    const [departments, setDepartments] = useState([]);
    const [departmentName, setDepartmentName] = useState("");
    const [departmentHead, setDepartmentHead] = useState("");
    const [editId, setEditId] = useState(null);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/departments");
            console.log(response.data);
            setDepartments(response.data.data || []); // Ensure that data is available and in the correct structure
        } catch (error) {
            console.error("Error fetching departments:", error);
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, []);

    const handleCreate = async () => {
        try {
            await axios.post("http://localhost:5000/api/departments", {
                Dept_Name: departmentName, // Corrected field name
                Dept_Description: departmentHead // Corrected field name
            });
            // After creating, re-fetch departments
            fetchDepartments();
            setDepartmentName("");
            setDepartmentHead("");
        } catch (error) {
            console.error("Error creating department:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axios.put("http://localhost:5000/api/departments", {
                id: editId,                       // Including ID for update
                Dept_Name: departmentName,        // Corrected field name
                Dept_Description: departmentHead  // Corrected field name
            });
            // After updating, re-fetch departments
            fetchDepartments();
            setEditId(null);
            setDepartmentName("");
            setDepartmentHead("");
        } catch (error) {
            console.error("Error updating department:", error);
        }
    };

    const handleDelete = async (Dept_ID) => {
        try {
            await axios.delete("http://localhost:5000/api/departments", { data: { Dept_ID } });
            // After deleting, re-fetch departments
            fetchDepartments();
        } catch (error) {
            console.error("Error deleting department:", error);
        }
    };

    const handleEdit = (department) => {
        setEditId(department.id);
        setDepartmentName(department.Dept_Name); // Corrected field name
        setDepartmentHead(department.Dept_Description); // Corrected field name
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#4CAF50" }}>Department Management</h1>

            {/* Create / Edit Form */}
            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "10px", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                <h2>{editId ? "Edit Department" : "Create Department"}</h2>
                <input
                    type="text"
                    placeholder="Department Name"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                <input
                    type="text"
                    placeholder="Department Head"
                    value={departmentHead}
                    onChange={(e) => setDepartmentHead(e.target.value)}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "4px", border: "1px solid #ddd" }}
                />
                {editId ? (
                    <button
                        onClick={handleUpdate}
                        style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Update Department
                    </button>
                ) : (
                    <button
                        onClick={handleCreate}
                        style={{ width: "100%", padding: "10px", backgroundColor: "#4CAF50", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                    >
                        Create Department
                    </button>
                )}
            </div>

            {/* Department List */}
            <div style={{ marginTop: "20px" }} >
                <h2 style={{ textAlign: "center", color: "#333" }}>Departments</h2>
                {departments.length === 0 ? (
                    <p>No departments available.</p>
                ) : (
                    <ul style={{ listStyleType: "none", padding: "0", maxWidth: "800px", margin: "0 auto" }} >
                        {departments.map(department => (
                            <li key={department.Dept_ID} style={{ padding: "10px", marginBottom: "10px", border: "1px solid #ddd", borderRadius: "4px", backgroundColor: "#f1f1f1" }}>
                                <span style={{ fontWeight: "bold" }}>{department.Dept_Name}</span> - Head: {department.Dept_Description}
                                <div style={{ marginTop: "10px" }}>
                                    <button
                                        onClick={() => handleEdit(department)}
                                        style={{ marginRight: "10px", padding: "6px 12px", backgroundColor: "#FFC107", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(department.id)}
                                        style={{ padding: "6px 12px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DepartmentPage;
