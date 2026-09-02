import React, { useEffect, useRef, useContext } from 'react'
import { Context } from '../../context/context'
import './ParticleCanvas.css'

const ParticleCanvas = () => {
    const canvasRef = useRef(null)
    const { theme, loading } = useContext(Context)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        let animationFrameId
        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)

        const mouse = {
            x: -1000,
            y: -1000,
            radius: 180
        }

        const handleMouseMove = (e) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        const handleMouseLeave = () => {
            mouse.x = -1000
            mouse.y = -1000
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
            initParticles()
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseleave', handleMouseLeave)
        window.addEventListener('resize', handleResize)

        // Theme color definitions for particles
        const getThemeColors = () => {
            switch (theme) {
                case 'synthwave':
                    return {
                        particle: 'rgba(244, 63, 94, ',
                        line: 'rgba(236, 72, 153, ',
                        accent: 'rgba(232, 121, 249, '
                    }
                case 'obsidian':
                    return {
                        particle: 'rgba(255, 255, 255, ',
                        line: 'rgba(161, 161, 170, ',
                        accent: 'rgba(255, 255, 255, '
                    }
                case 'matrix':
                    return {
                        particle: 'rgba(34, 197, 94, ',
                        line: 'rgba(16, 185, 129, ',
                        accent: 'rgba(110, 231, 183, '
                    }
                case 'cyber':
                default:
                    return {
                        particle: 'rgba(56, 189, 248, ',
                        line: 'rgba(129, 140, 248, ',
                        accent: 'rgba(192, 132, 252, '
                    }
            }
        }

        let particles = []
        const numParticles = Math.min(Math.floor((width * height) / 14000), 75)

        class Particle {
            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.8
                this.vy = (Math.random() - 0.5) * 0.8
                this.radius = Math.random() * 2 + 1
                this.baseAlpha = Math.random() * 0.4 + 0.2
                this.pulseSpeed = Math.random() * 0.02 + 0.01
                this.pulse = 0
            }

            update(speedMultiplier) {
                this.pulse += this.pulseSpeed
                this.x += this.vx * speedMultiplier
                this.y += this.vy * speedMultiplier

                // Bounce off canvas edges
                if (this.x < 0 || this.x > width) this.vx *= -1
                if (this.y < 0 || this.y > height) this.vy *= -1

                // Mouse interaction (repel gently)
                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < mouse.radius) {
                    const forceDirectionX = dx / dist
                    const forceDirectionY = dy / dist
                    const force = (mouse.radius - dist) / mouse.radius
                    this.x -= forceDirectionX * force * 2.5
                    this.y -= forceDirectionY * force * 2.5
                }
            }

            draw(colors, isThinking) {
                ctx.beginPath()
                const currentAlpha = Math.sin(this.pulse) * 0.25 + this.baseAlpha
                ctx.arc(this.x, this.y, isThinking ? this.radius * 1.5 : this.radius, 0, Math.PI * 2)
                ctx.fillStyle = colors.particle + (isThinking ? Math.min(currentAlpha + 0.3, 0.9) : currentAlpha) + ')'
                
                if (isThinking) {
                    ctx.shadowBlur = 12
                    ctx.shadowColor = colors.accent + '0.8)'
                } else {
                    ctx.shadowBlur = 0
                }
                
                ctx.fill()
            }
        }

        const initParticles = () => {
            particles = []
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle())
            }
        }

        initParticles()

        const render = () => {
            ctx.clearRect(0, 0, width, height)
            const colors = getThemeColors()
            const speedMultiplier = loading ? 2.2 : 1.0

            // Draw connecting lines between close particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(speedMultiplier)
                particles[i].draw(colors, loading)

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    const maxDistance = loading ? 160 : 130
                    if (distance < maxDistance) {
                        const alpha = (1 - distance / maxDistance) * (loading ? 0.35 : 0.18)
                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = colors.line + alpha + ')'
                        ctx.lineWidth = loading ? 1.2 : 0.8
                        ctx.stroke()
                    }
                }

                // Connect particles to mouse
                const dxMouse = mouse.x - particles[i].x
                const dyMouse = mouse.y - particles[i].y
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)
                if (distMouse < mouse.radius) {
                    const alphaMouse = (1 - distMouse / mouse.radius) * 0.4
                    ctx.beginPath()
                    ctx.moveTo(particles[i].x, particles[i].y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.strokeStyle = colors.accent + alphaMouse + ')'
                    ctx.lineWidth = 1.0
                    ctx.stroke()
                }
            }

            animationFrameId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseleave', handleMouseLeave)
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [theme, loading])

    return <canvas ref={canvasRef} className="particle-canvas" />
}

export default ParticleCanvas
