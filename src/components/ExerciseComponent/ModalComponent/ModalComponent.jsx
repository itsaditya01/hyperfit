import React from "react";
import { motion } from "framer-motion";
import SquatsVid from "../../../assets/squats.mp4";

const ModalComponent = () => {
  return (
    <motion.div className="modal-bg">
      <motion.div className="modal-tut">
        <video src={SquatsVid} />
      </motion.div>
    </motion.div>
  );
};

export default ModalComponent;
