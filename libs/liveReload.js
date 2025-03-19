const evtSource = new EventSource("/api/reload-if-closes");
evtSource.onerror = () => setTimeout(() => location.reload(), 1000);