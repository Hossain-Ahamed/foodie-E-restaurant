# foodie-E-restaurant

Customer-end view of the Foodie E restaurant panel

```javascript
useEffect(() => {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
          
            try {
              const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude${latitude}&longitude=${longitude}&localityLanguage=en`);
              const data = await response.json();
            
              console.log(data);
            
            } catch (error) {
              console.error("Error fetching city:", error);
            }
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }, []);
```
