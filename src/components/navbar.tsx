"use client";
import { useState } from "react";
import { Menu, User, LogOut } from "lucide-react";

export default function Navbar() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  return (
    <div className="top-bar" style={{
      backgroundColor: "white", 
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      height: "60px"
    }}>
      <div className="row expanded" style={{ height: "100%" }}>
        <div className="columns small-12" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem",
          height: "100%"
        }}>
          {/* Mobile Menu Button */}
          <button className="hide-for-large" style={{ color: "#666", background: "none", border: "none" }}>
            <Menu style={{ width: "1.5rem", height: "1.5rem" }} />
          </button>
          
          <h1 className="h4" style={{ 
            fontSize: "1.125rem", 
            fontWeight: "600", 
            color: "#333",
            margin: 0
          }}>Dashboard</h1>
          
          {/* User Dropdown */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#555",
                cursor: "pointer",
                background: "none",
                border: "none"
              }}
            >
              <User style={{ width: "1.5rem", height: "1.5rem" }} />
              <span>Profile</span>
            </button>
            
            {isDropdownOpen && (
              <div style={{
                position: "absolute",
                right: 0,
                marginTop: "0.5rem",
                width: "12rem",
                backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                borderRadius: "0.5rem",
                overflow: "hidden",
                zIndex: 1000
              }}>
                <button style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <User style={{ width: "1.25rem", height: "1.25rem" }} />
                  <span>My Profile</span>
                </button>
                
                <button style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "0.5rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                >
                  <LogOut style={{ width: "1.25rem", height: "1.25rem" }} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}