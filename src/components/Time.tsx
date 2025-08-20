"use client";

import { useEffect, useState, useCallback, memo } from "react";
import { TextFade } from "../app/structure/TextFade";
import { motion } from "framer-motion";

const Time = memo(() => {
	const [time, setTime] = useState<string>("");

	const updateTime = useCallback(() => {
		let rafId: number;

		const update = () => {
			setTime(
				new Date().toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
					second: "2-digit",
				})
			);
			rafId = requestAnimationFrame(update);
		};

		update();
		return () => cancelAnimationFrame(rafId);
	}, []);

	useEffect(() => {
		const cleanup = updateTime();
		return cleanup;
	}, [updateTime]);

	return (
		<div className="text-sm flex justify-center items-center font-semibold non-selectable">
			<motion.div
				initial={{ opacity: 0, y: -5 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.2, ease: "easeInOut" }}
			>
				<TextFade
					fullLoadedDuration={0.5}
					words={time}
					className="text-white/90"
				/>
			</motion.div>
		</div>
	);
});

Time.displayName = "Time";

export default Time;
