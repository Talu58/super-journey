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
  const { threadName } = thread;
  const newThread = {
    ...thread
  };
  let newMessagingThreads = messagingThreads.map(thread => {
    if (thread.threadName === threadName) {
      thread = newThread;
    }
    return thread;
  });
  return newMessagingThreads;
};

export function sortAllMessageThreads(allMessageThreads) {
  let newAllMessageThread = [...allMessageThreads];
  
  newAllMessageThread.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
  return newAllMessageThread;
};

export function addReceivedMessageToAllMessageThreads(allMessageThreads, newMessage) {
  let newAllMessageThread = allMessageThreads.map(thread => {
    if (thread.threadName === newMessage.threadName) {
      thread.messages.push(newMessage);
    }
    return thread;
  });

  return newAllMessageThread;
};

export function setNotificationList(allMessageThreads) {
  let notificationList = {};
  allMessageThreads.forEach(thread => {
    notificationList[thread.threadName] = 0;
  });
  return notificationList;
};
