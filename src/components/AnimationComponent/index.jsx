import { motion } from "framer-motion"

const AnimatedComponent = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: -1 }}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedComponent