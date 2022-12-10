// Libraries
import { motion } from 'framer-motion'

export const SnakeLoader = ({ bg, size, distance }) => {
    const loaderContainer = {
        start: {
            transition: {
                staggerChildren: 0.1,
            },
        },
        end: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    const cVariants = {
        start: {
            y: '0%',
            opacity: 0,
            scale: 1
        },
        end: {
            y: ['5%', '-5%'],
            opacity: 1,
            scale: 1.5,
        },
    }
    const cTransition = {
        duration: 0.3,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
    }
    const circle = {
        width: size,
        height: size,
        backgroundColor: bg,
        borderRadius: '50%',
        fontWeight: 700,
        marginLeft: distance
    }
    return (
        <motion.div variants={loaderContainer} initial="start" animate="end" style={{display: 'flex'}}>
            <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div>
            <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div>
            <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div>
            {/* <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div>
            <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div>
            <motion.div style={circle} variants={cVariants} transition={cTransition}></motion.div> */}
        </motion.div>
    )
}