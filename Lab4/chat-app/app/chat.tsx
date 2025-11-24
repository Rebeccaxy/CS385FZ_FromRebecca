import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_BASE_URL, DEFAULT_USERNAME } from '../constants/config';

type Message = {
  id: string;
  username: string;
  text: string;
  timestamp?: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const normalizeMessages = (rawMessages: any[]): Message[] =>
    rawMessages.map((msg) => ({
      id: msg._id ?? msg.id ?? String(Math.random()),
      username: msg.username ?? 'Unknown',
      text: msg.text ?? '',
      timestamp: msg.timestamp,
    }));

  const fetchMessages = useCallback(async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/messages`);
      const json = await response.json();

      if (!json.success || !Array.isArray(json.data)) {
        throw new Error('无法读取服务器返回的消息列表');
      }

      setMessages(normalizeMessages(json.data));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '获取消息时出现未知错误。'
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSend = async () => {
    if (!canSend) return;
    try {
      setIsSending(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: DEFAULT_USERNAME,
          text: input.trim(),
        }),
      });

      const json = await response.json();

      if (!json.success || !json.data) {
        throw new Error(json.error ?? '创建消息失败');
      }

      const newMessage = normalizeMessages([json.data])[0];
      setMessages((prev) => [newMessage, ...prev]);
      setInput('');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '发送消息时出现未知错误。'
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.safeArea}>
        <View style={styles.container}>
          {isLoading ? (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color="#3178c6" />
              <Text style={styles.loaderText}>正在加载历史消息...</Text>
            </View>
          ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            inverted
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  setIsRefreshing(true);
                  fetchMessages();
                }}
                tintColor="#3178c6"
              />
            }
            renderItem={({ item }) => (
              <View style={styles.messageBubble}>
                <Text style={styles.messageAuthor}>{item.username}:</Text>
                <Text style={styles.messageText}>{item.text}</Text>
                {item.timestamp && (
                  <Text style={styles.messageTimestamp}>
                    {new Date(item.timestamp).toLocaleString()}
                  </Text>
                )}
              </View>
            )}
          />)}

          {error && (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>⚠️ {error}</Text>
            </View>
          )}

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={input}
              onChangeText={setInput}
              returnKeyType="send"
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!canSend || isSending) && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!canSend || isSending}>
              <Text style={styles.sendButtonText}>
                {isSending ? 'SENDING...' : 'SEND'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  listContent: {
    paddingVertical: 16,
    gap: 12,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  loaderText: {
    color: '#555',
  },
  messageBubble: {
    backgroundColor: '#f2f4f7',
    borderRadius: 12,
    padding: 12,
  },
  messageAuthor: {
    fontWeight: '600',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  errorBanner: {
    backgroundColor: '#fdecea',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  errorText: {
    color: '#b3261e',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#e0e0e0',
    paddingTop: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#3178c6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
  },
  sendButtonDisabled: {
    backgroundColor: '#9bbbe5',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

