import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";
import { predictImage } from "../../services/predictionService";

const PredictionPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file && file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await predictImage(formData);
      setResult(response.prediction.prediction);
      toast.success("Analysis completed successfully!");
    } catch (error) {
      console.error("Prediction error:", error);
      toast.error(error.message || "Failed to analyze image");
      setResult({ error: "Failed to analyze image. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 py-[10vh] px-4">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4 text-center">
          🌱 Upload a Plant Leaf Image
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Our AI will analyze your image and detect possible plant diseases.
        </p>

        {/* Upload Box */}
        <label
          className={`border-2 border-dashed ${
            dragActive ? "border-green-700 bg-green-50" : "border-green-500"
          } w-full h-80 flex flex-col items-center justify-center cursor-pointer rounded-lg shadow-md transition mb-6`}
          onDragEnter={() => setDragActive(true)}
          onDragLeave={() => setDragActive(false)}
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {preview ? (
            <img
              src={preview}
              alt="Uploaded preview"
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-600">
              <FaCloudUploadAlt size={50} className="text-green-600" />
              <p className="mt-2 font-medium">Click or drag to upload</p>
              <p className="text-sm text-gray-500 mt-1">
                Supports JPG, PNG (Max 5MB)
              </p>
            </div>
          )}
        </label>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className={`w-full mt-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300 flex items-center justify-center ${
            !image ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!image || loading}
        >
          {loading ? (
            <>
              <CircleLoader color="#ffffff" size={20} className="mr-3" />
              Analyzing...
            </>
          ) : (
            "🔍 Analyze Image"
          )}
        </button>

        {/* Result Display */}
        {result && (
          <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg shadow-sm">
            {result.error ? (
              <p className="text-red-500 text-center">{result.error}</p>
            ) : (
              <div>
                <h2 className="text-2xl font-bold text-green-700 mb-2 text-center">
                  {result.plant} - {result.disease}
                </h2>
                <p className="text-gray-700 text-center mb-6">
                  Confidence:{" "}
                  <span className="font-semibold">
                    {(result.confidence * 100).toFixed(2)}%
                  </span>
                </p>

                {result.diseaseInfo && (
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">
                        📝 About this disease:
                      </h3>
                      <p className="text-gray-700 mb-4">
                        {result.diseaseInfo.description}
                      </p>

                      <h3 className="font-semibold text-green-700 mb-2">
                        ⚠️ Causes:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {result.diseaseInfo.causes.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-green-700 mb-2">
                        🛡️ Prevention:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-4">
                        {result.diseaseInfo.prevention.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>

                      <h3 className="font-semibold text-green-700 mb-2">
                        💊 Treatment:
                      </h3>
                      <ul className="list-disc pl-5 text-gray-700 space-y-1">
                        {result.diseaseInfo.treatment.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionPage;
