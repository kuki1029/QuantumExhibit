import React from "react";
import "./style.css";
import { FaGithub } from "react-icons/fa";
import { socialProfile } from "../../content_option";

export const Socialicons = (params) => {
  return (
    <div className="stick_follow_icon">
      <ul>
        {socialProfile.github && (
          <li>
            <a href={socialProfile.github}>
              <FaGithub />
            </a>
          </li>
        )}

      </ul>
      <p>Follow Us</p>
    </div>
  );
};
