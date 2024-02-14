import mermaid from "mermaid";

const Plugin = {
  id: "mermaid",

  init: function (reveal) {
    let { ...mermaidConfig } = reveal.getConfig().mermaid || {}

    mermaid.mermaidAPI.initialize({
      startOnLoad: false,
      ...mermaidConfig,
    })
    
    const mermaidElements = reveal.getRevealElement().querySelectorAll(".mermaid")
    let idIterator = 0
    const id = () => idIterator += 1

    Array.from(mermaidElements).forEach(async function (element) {
      const definition = element.innerHTML
        .trim()
        .replaceAll("&gt;", ">")
        .replaceAll("&lt;", "<")
        .replaceAll(/icon:([a-z]+)/g, "<i class=\"bi bi-$1\">")

      const {svg} = await mermaid.render(`mermaid-rendered-${id()}`, definition)

      if (Array.from(element.parentElement.classList).includes("code-wrapper")) {
        element.parentElement.outerHTML = svg
      } else {
        element.outerHTML = svg
      }
    });
  },
};

export default () => Plugin
