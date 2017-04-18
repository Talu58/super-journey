export function addMessageThread(messagingThreads, thread) {
  const { data: {created_at, updated_at, messages, threadName }} = thread;
  const newThread = {
    created_at,
    updated_at,
    messages,
    threadName
  };
  console.log('addMessageThread newThread', newThread);
  let newMessagingThreads = [...messagingThreads];
  newMessagingThreads.unshift(newThread);
  return newMessagingThreads
};