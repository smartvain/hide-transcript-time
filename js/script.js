$(() => {
  $('.js_toggle-display-time').on('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const tab = tabs[0]
      const youtubeLink = /https:\/\/www\.youtube\.com\/watch*/
      if (!tab.url.match(youtubeLink)) {
        window.alert('You have to open YouTube video')
        return
      }

      chrome.scripting.executeScript({target: { tabId: tab.id }, func: () => {
        const startOffsetSegments = document.getElementsByClassName("segment-start-offset style-scope ytd-transcript-segment-renderer")
        if (startOffsetSegments.length === 0) {
          window.alert('You need to show Transcript')
          return
        }
        let displayType = 'none'
        Array.prototype.forEach.call(startOffsetSegments, (segment, index) => {
          if (index === 0) {
            if (segment.style.display === 'none') displayType = 'block'
          }
          segment.style.display = displayType
        })
      
        const segmentListRenderers = document.getElementsByClassName("style-scope ytd-transcript-segment-list-renderer")
        let pointerEventsType = 'none'
        Array.prototype.forEach.call(segmentListRenderers, (renderer, index) => {
          if (index === 0) {
            if (renderer.style.pointerEvents === 'none') pointerEventsType = 'auto'
          }
          renderer.style.pointerEvents = pointerEventsType
        })
      }})
    })
  })

})
