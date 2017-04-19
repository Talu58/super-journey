export function addMessageThread(messagingThreads, thread) {
  const { created_at, updated_at, messages, threadName, sender, recipient } = thread;
  const newThread = {
    created_at,
    updated_at,
    messages,
    threadName,
    sender,
    recipient
  };
  let newMessagingThreads = [...messagingThreads];
  newMessagingThreads.unshift(newThread);
  return newMessagingThreads
};

export function replaceMessageThread(messagingThreads, thread) {
  const { created_at, updated_at, messages, threadName, sender, recipient } = thread;
  const newThread = {
    created_at,
    updated_at,
    messages,
    threadName,
    sender,
    recipient
  };
  let newMessagingThreads = messagingThreads.map(thread => {
    if (thread.threadName === threadName) {
      thread = newThread;
    }
    return thread;
  });
  return newMessagingThreads;
}
