import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fefefe",
  },
  details: {
    marginLeft: 15,
    justifyContent: "space-between",
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
  image: {
    alignSelf: "flex-end",
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  imageContainer: {
    flex: 1,
    alignContent: "flex-end",
  },
  itemContainer: {
    flex: 1,
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    margin: 10,
    borderColor: "#a0a0a0",
    borderWidth: 2,
  },

  name: {
    fontSize: 18,
  },
  price: {
    fontSize: 16,
    color: "#888",
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  qtyBtn: {
    backgroundColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 4,
    // marginHorizontal: 6,
  },
  qtyBtnText: {
    fontSize: 18,
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 6,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "right",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 10,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default styles;
