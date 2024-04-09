import { motion } from "framer-motion"

const AnimatedComponent = ({ children }) => {
    return (
        <motion.div

            transition={{ type: "tween", stiffness: 100 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: -1, scale: 1 }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedComponent