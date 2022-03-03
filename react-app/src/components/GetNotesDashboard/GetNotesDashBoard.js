import React from 'react';
import PostNote from '../PostNote/PostNote';
import { motion } from 'framer-motion';
import { fadeOut, transition } from '../animations';

export default function GetNotesDashBoard() {
  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={fadeOut}
      transition={transition}
    >
      <div className='no-note-parent'>
        <h3 className='no-note'>
          <PostNote />
        </h3>
      </div>
    </motion.div>
  );
}
