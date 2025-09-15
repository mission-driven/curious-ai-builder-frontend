import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface IFrameProps {
    title?: string;
    className?: string;
    htmlAttrs?: Record<string, string>;
    head?: React.ReactNode;
    children?: React.ReactNode;
    copyParentStyles?: boolean;
    stylesheetUrls?: string[];
    styleText?: string;
}

export default function IFrame({ title = 'App Preview', className, htmlAttrs = {}, head, children, copyParentStyles = false, stylesheetUrls = [], styleText }: IFrameProps) {
    const iframeRef = useRef<HTMLIFrameElement | null>(null)
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null)

    useLayoutEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return
        const doc = iframe.contentDocument
        if (!doc) return

        // Set basic HTML skeleton
        doc.open()
        doc.write('<!DOCTYPE html><html><head></head><body></body></html>')
        doc.close()

        // Tailwind base reset via inherited classes can be different in iframe;
        // Use a neutral dark background to match preview.
        const style = doc.createElement('style')
        style.textContent = `
          html, body { margin: 0; padding: 0; height: 100%; background: #0F0F10; color: #fff; }
          * { box-sizing: border-box; }
        `
        doc.head.appendChild(style)

        // Apply provided html attributes to <html>
        Object.entries(htmlAttrs).forEach(([k, v]) => {
            try { doc.documentElement.setAttribute(k, v) } catch { }
        })

        // Optionally copy parent's <link rel="stylesheet"> and <style> tags
        if (copyParentStyles) {
            const parentHead = document.head
            parentHead.querySelectorAll('link[rel="stylesheet"], style').forEach((el) => {
                const clone = el.cloneNode(true) as HTMLElement
                doc.head.appendChild(clone)
            })
        }


        // Add external stylesheets if provided
        stylesheetUrls.forEach((href) => {
            const link = doc.createElement('link')
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = href
            doc.head.appendChild(link)
        })

        // Add raw CSS text if provided
        if (styleText) {
            const extra = doc.createElement('style')
            extra.textContent = styleText
            doc.head.appendChild(extra)
        }

        setMountNode(doc.body)
    }, [])

    return (
        <iframe ref={iframeRef} title={title} className={className} style={{ border: 'none' }}>
            {mountNode && head ? createPortal(head, iframeRef.current!.contentDocument!.head) : null}
            {mountNode ? createPortal(children, mountNode) : null}
        </iframe>
    )
}
